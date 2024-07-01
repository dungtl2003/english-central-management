import {db} from "@/lib/db";
import {clerkClient} from "@clerk/nextjs/server";
import {UserRole} from "@prisma/client";

export function addParent(clerkUserId: string) {
    return db.$transaction(async () => {
        await db.user.update({
            where: {
                referId: clerkUserId,
            },
            data: {
                role: UserRole.PARENT,
                parent: {
                    create: {},
                },
            },
        });

        await clerkClient.users.updateUser(clerkUserId, {
            publicMetadata: {
                role: UserRole.PARENT,
            },
        });
    });
}
