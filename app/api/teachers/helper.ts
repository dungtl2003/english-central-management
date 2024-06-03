import {db} from "@/lib/db";
import {clerkClient} from "@clerk/nextjs/server";

export function addTeacher(clerkUserId: string) {
    return db.$transaction(async () => {
        const teacher = await db.user.update({
            where: {
                referId: clerkUserId,
            },
            data: {
                role: "TEACHER",
                teacher: {
                    create: {},
                },
            },
            include: {
                teacher: true,
            },
        });

        const clerkUser = await clerkClient.users.updateUser(clerkUserId, {
            publicMetadata: {
                role: "TEACHER",
            },
        });

        return [teacher, clerkUser];
    });
}
