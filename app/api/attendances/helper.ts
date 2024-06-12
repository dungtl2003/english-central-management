import {db} from "@/lib/db";
import {authHandler, getClerkRole} from "@/lib/helper";
import {auth} from "@clerk/nextjs/server";
import {UserRole} from "@prisma/client";
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

export const buildAttendanceUpdateQueries = (
    sessionId: string,
    attendances: Attendance[]
) => {
    return attendances.map((attendance) => {
        return db.attendance.update({
            where: {
                id: attendance.attendanceId,
                sessionId: sessionId,
            },
            data: {
                status: attendance.status,
                description: attendance.description,
                updatedAt: new Date(),
            },
        });
    });
};
