import {db} from "@/lib/db";
import {clerkClient} from "@clerk/nextjs/server";
import {UserRole} from "@prisma/client";

export function addStudent(clerkUserId: string) {
    return db.$transaction(async () => {
        await db.user.update({
            where: {
                referId: clerkUserId,
            },
            data: {
                role: UserRole.STUDENT,
                student: {
                    create: {},
                },
            },
        });

        try {
            await clerkClient.users.updateUser(clerkUserId, {
                publicMetadata: {
                    role: UserRole.STUDENT,
                },
            });
        } catch (error) {
            console.error("Cannot find clerk user");
        }
    });
}
