import {db} from "@/lib/db";
import {getClerkRole} from "@/lib/helper";
import {auth} from "@clerk/nextjs/server";
import {UserRole} from "@prisma/client";

export async function authPayHandler(
    referTeacherId: string,
    classId: string,
    studentId: string
): Promise<void> {
    const clerkUserId = auth().userId;
    const role: UserRole | null = getClerkRole();

    if (!clerkUserId) {
        throw new Error("No signed in user");
    }

    if (!role || role !== UserRole.TEACHER || clerkUserId !== referTeacherId) {
        throw new Error("No right permission");
    }

    const user = await db.user.findFirst({
        where: {
            referId: clerkUserId,
            role: role as UserRole,
        },
        include: {
            teacher: true,
        },
    });

    if (!user) {
        throw new Error(
            `Cannot find account with id ${clerkUserId} in database`
        );
    }

    const cls = await db.class.findFirst({
        where: {
            id: classId,
            teacherId: user.teacher!.id,
            students: {
                some: {
                    studentId: studentId,
                },
            },
        },
    });
    if (!cls) {
        throw new Error(
            `Cannot find class with given teacher ID, student ID, class ID in database`
        );
    }
}
