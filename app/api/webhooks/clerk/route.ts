"use server";

import {NextRequest, NextResponse} from "next/server";
import {headers} from "next/headers";
import {Webhook} from "svix";
import {WebhookEvent} from "@clerk/nextjs/server";
import {db} from "@/lib/db";
import {Gender, User} from "@prisma/client";

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
        unsafe_metadata: {
            birthday: string;
            gender: Gender;
            identityCard: string;
            phoneNumber: string;
        };
    };
}

enum EventTypes {
    DELETE = "user.deleted",
    CREATE = "user.created",
    UPDATE = "user.updated",
}

export async function POST(req: NextRequest) {
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
        console.error("Error verifying webhook:", (<Error>err).message);
        return new NextResponse("Error occured", {
            status: 400,
        });
    }

    const {id} = evt.data;
    const eventType = evt.type;
    console.log(`Webhook with and ID of ${id} and type of ${eventType}`);
    console.log("Webhook body: ", payload);

    switch (eventType) {
        case EventTypes.CREATE:
            return await upsertUserHandler(payload);
        case EventTypes.UPDATE:
            return await upsertUserHandler(payload);
        case EventTypes.DELETE:
            return await deleteUserHandler(payload);
        default:
            console.log("Error: Invalid event type");
            return new NextResponse("Error: Invalid event type", {
                status: 400,
            });
    }
}

const upsertUserHandler = async (payload: Payload): Promise<NextResponse> => {
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
        phoneNumber: data.unsafe_metadata.phoneNumber,
        identifyCard: data.unsafe_metadata.identityCard,
        gender: data.unsafe_metadata.gender,
        //birthday:unsafe?.birthday,
        birthday: data.unsafe_metadata.birthday
            ? new Date(data.unsafe_metadata.birthday as string)
            : undefined,
    } as User;

    try {
        const user = await db.user.upsert({
            where: {
                referId: data.id,
            },
            create: userData,
            update: userData,
        });
        console.log("Upserted user: ", user);
        return NextResponse.json("", {status: 200});
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return NextResponse.json(
            {error: "Failed to upsert user"},
            {status: 500}
        );
    }
};

const deleteUserHandler = async (payload: Payload): Promise<NextResponse> => {
    const data = payload.data;
    try {
        const user = await db.user.delete({
            where: {
                referId: data.id,
            },
        });
        console.log("Deleted user: ", user);
        return new NextResponse("", {status: 200});
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return NextResponse.json(
            {error: "Failed to delete user"},
            {status: 500}
        );
    }
};
