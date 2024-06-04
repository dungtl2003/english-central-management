import {db} from "@/lib/db";
import {clerkClient} from "@clerk/nextjs/server";

export function addStudent(clerkUserId: string) {
    return db.$transaction(async () => {
        const student = await db.user.update({
            where: {
                referId: clerkUserId,
            },
            data: {
                role: "STUDENT",
                student: {
                    create: {},
                },
            },
            include: {
                student: true,
            },
        });

        const clerkUser = await clerkClient.users.updateUser(clerkUserId, {
            publicMetadata: {
                role: "STUDENT",
            },
        });

        return [student, clerkUser];
    });
}
