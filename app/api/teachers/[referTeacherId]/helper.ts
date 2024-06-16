import {db} from "@/lib/db";
import {getClerkRole} from "@/lib/helper";
import {auth} from "@clerk/nextjs/server";
import {UserRole} from "@prisma/client";

export async function authGetHandler(referTeacherId: string): Promise<void> {
    const clerkUserId = auth().userId;
    const role: UserRole | null = getClerkRole();

    if (!clerkUserId) {
        throw new Error("No signed in user");
    }

    if (
        !role ||
        role !== UserRole.TEACHER ||
        (role === UserRole.TEACHER && clerkUserId !== referTeacherId)
    ) {
        throw new Error("No right permission");
    }

    const user = await db.user.findFirst({
        where: {
            referId: clerkUserId,
            role: role!,
        },
    });

    if (!user) {
        throw new Error(
            `Cannot find account with id ${clerkUserId} in database`
        );
    }
}

export async function authPatchHandler(referTeacherId: string): Promise<void> {
    const clerkUserId = auth().userId;
    const role: UserRole | null = getClerkRole();

    if (!clerkUserId) {
        throw new Error("No signed in user");
    }

    if (
        !role ||
        (role !== UserRole.ADMIN && role !== UserRole.TEACHER) ||
        (role === UserRole.TEACHER && clerkUserId !== referTeacherId)
    ) {
        throw new Error("No right permission");
    }

    const user = await db.user.findFirst({
        where: {
            referId: clerkUserId,
            role: role!,
        },
    });

    if (!user) {
        throw new Error(
            `Cannot find account with id ${clerkUserId} in database`
        );
    }
}
