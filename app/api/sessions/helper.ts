import {db} from "@/lib/db";
import {getClerkRole} from "@/lib/helper";
import {auth} from "@clerk/nextjs/server";
import {UserRole} from "@prisma/client";

export async function authGetHandler(): Promise<void> {
    const clerkUserId = auth().userId;
    const role: UserRole | null = getClerkRole();

    if (!clerkUserId) {
        throw new Error("No signed in user");
    }

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
}
