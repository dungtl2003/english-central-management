import {db} from "@/lib/db";
import {getClerkRole} from "@/lib/helper";
import {auth} from "@clerk/nextjs/server";
import {UserRole} from "@prisma/client";

export const authGetHandler = async (): Promise<string> => {
    const clerkUserId = auth().userId;
    const role: UserRole | null = getClerkRole();

    if (!clerkUserId) {
        throw new Error("No signed in user");
    }

    if (!role || role !== UserRole.TEACHER) {
        throw new Error("No right permission");
    }

    const teacher = await db.user.findFirst({
        where: {
            referId: clerkUserId!,
            role: "TEACHER",
        },
        include: {
            teacher: true,
        },
    });

    if (!teacher) {
        throw new Error(
            `No teacher with refer ID ${clerkUserId} found in database`
        );
    }

    return teacher.teacher!.id;
};
