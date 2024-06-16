import {db} from "@/lib/db";
import {getClerkRole} from "@/lib/helper";
import {auth, clerkClient} from "@clerk/nextjs/server";
import {UserRole} from "@prisma/client";

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

export async function authGetHandler(): Promise<void> {
    const clerkUserId = auth().userId;
    const role: UserRole | null = getClerkRole();

    if (!clerkUserId) {
        throw new Error("No signed in user");
    }

    if (!role || role !== UserRole.ADMIN) {
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
