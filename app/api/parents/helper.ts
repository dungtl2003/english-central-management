import {db} from "@/lib/db";
import {clerkClient} from "@clerk/nextjs/server";

export function addParent(clerkUserId: string) {
    return db.$transaction(async () => {
        const parent = await db.user.update({
            where: {
                referId: clerkUserId,
            },
            data: {
                role: "PARENT",
                student: {
                    create: {},
                },
            },
            include: {
                parent: true,
            },
        });

        const clerkUser = await clerkClient.users.updateUser(clerkUserId, {
            publicMetadata: {
                role: "PARENT",
            },
        });

        return [parent, clerkUser];
    });
}
