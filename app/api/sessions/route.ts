import {db} from "@/lib/db";
import {authHandler, getClerkRole} from "@/lib/helper";
import {auth} from "@clerk/nextjs/server";
import {UserRole} from "@prisma/client";
import {NextRequest, NextResponse} from "next/server";

/**
 * Get sessions and class, teacher's details along each session.
 * Only admin can access this api.
 */
export async function GET(req: NextRequest) {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("GET ", req.url);

    try {
        await authHandler();

        const role: UserRole | null = getClerkRole();
        const clerkUserId = auth().userId;

        if (!role || role !== UserRole.ADMIN) {
            throw new Error("No right permission");
        }

        const admin = await db.user.findFirst({
            where: {
                referId: clerkUserId!,
                role: "ADMIN",
            },
        });

        if (!admin) {
            throw new Error(
                `No admin with refer ID ${clerkUserId} found in database`
            );
        }
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return NextResponse.json(
            {error: (<Error>error).message},
            {status: 401}
        );
    }

    try {
        const sessions = await db.session.findMany({
            include: {
                class: {
                    include: {
                        unit: true,
                        teacher: {
                            include: {
                                user: true,
                            },
                        },
                    },
                },
            },
        });

        console.log("Got sessions: ", sessions);
        return NextResponse.json(sessions, {status: 200});
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return NextResponse.json(
            {error: "Failed to get sessions"},
            {status: 500}
        );
    }
}
