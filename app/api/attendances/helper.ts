import {db} from "@/lib/db";
import {authHandler, getClerkRole} from "@/lib/helper";
import {auth} from "@clerk/nextjs/server";
import {Prisma, Session, UserRole} from "@prisma/client";
import {Attendance} from "./schema";

export const handlePatchAuth = async (): Promise<string> => {
    await authHandler();

    const role: UserRole | null = getClerkRole();
    if (!role || role !== UserRole.TEACHER) {
        throw new Error("No right permission");
    }

    const teacherReferId = auth().userId;
    const teacher = await db.user.findFirst({
        where: {
            referId: teacherReferId!,
            role: "TEACHER",
        },
        include: {
            teacher: true,
        },
    });

    if (!teacher) {
        throw new Error(
            `No teacher with refer ID ${teacherReferId} found in database`
        );
    }

    return teacher.teacher!.id;
};

export const buildSessionUpdateInputObj = (
    attendances: Attendance[],
    session: Session
): Prisma.SessionUpdateInput => {
    const attendanceUpdateManyMutationInputObjs: Prisma.AttendanceUpdateManyMutationInput[] =
        [];
    attendances.forEach((attendance) => {
        attendanceUpdateManyMutationInputObjs.push({
            id: attendance.attendanceId,
            status: attendance.status,
            description: attendance.description,
            updatedAt: new Date(),
        } as Prisma.AttendanceUpdateManyMutationInput);
    });

    return {
        id: session.id,
        attendedTime: session.attendedTime ?? new Date(),
        attendances: {
            updateMany: {
                where: {
                    sessionId: session.id,
                },
                data: attendanceUpdateManyMutationInputObjs,
            },
        },
    } as Prisma.SessionUpdateInput;
};
