import {NextResponse} from "next/server";
import {headers} from "next/headers";
import {Webhook} from "svix";
import {WebhookEvent} from "@clerk/nextjs/server";
import {db} from "@/lib/db";

interface Payload {
    data: {
        id: string;
        first_name: string;
        last_name: string;
        profile_image_url: string;
        primary_email_address_id: string;
        email_addresses: {
            id: string;
            email_address: string;
        }[];
    };
}

enum EventTypes {
    UPDATE = "user.updated",
    CREATE = "user.created",
}

export async function POST(req: Request) {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("POST ", req.url);

    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;
    if (!WEBHOOK_SECRET) {
        throw new Error(
            "Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local"
        );
    }

    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get("svix-id");
    const svix_timestamp = headerPayload.get("svix-timestamp");
    const svix_signature = headerPayload.get("svix-signature");

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new NextResponse("Error occured -- no svix headers", {
            status: 400,
        });
    }

    // Get the body
    const payload: Payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            "svix-id": svix_id,
            "svix-timestamp": svix_timestamp,
            "svix-signature": svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error("Error verifying webhook:", err);
        return new NextResponse("Error occured", {
            status: 400,
        });
    }

    const {id} = evt.data;
    const eventType = evt.type;
    console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
    console.log("Webhook body: ", payload);

    if (eventType === EventTypes.CREATE || eventType === EventTypes.UPDATE) {
        const data = payload.data;
        const primaryEmailId = data.primary_email_address_id;
        const emails = (data.email_addresses || []).filter(
            (item) => item.id === primaryEmailId
        );

        if (emails.length <= 0) {
            return NextResponse.json(
                {message: "Invalid format message"},
                {status: 400}
            );
        }

        const userData = {
            referId: data.id,
            firstName: data.first_name,
            lastName: data.last_name,
            email: emails[0].email_address,
            imageUrl: data.profile_image_url,
        };

        const userRef = await db.user.findFirst({where: {referId: data.id}});
        if (!userRef) {
            const user = await db.user.create({data: userData});
            console.log("Insert new user: ", user);
        } else {
            const user = await db.user.update({
                where: {id: userRef.id},
                data: userData,
            });
            console.log("Update user: ", user);
        }
    }

    return new NextResponse("", {status: 200});
}