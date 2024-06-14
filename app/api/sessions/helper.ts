import {db} from "@/lib/db";
import {authHandler, getClerkRole} from "@/lib/helper";
import {auth} from "@clerk/nextjs/server";
import {Prisma, Session, StudentsInClasses, UserRole} from "@prisma/client";
import {add} from "date-fns";

interface StudyTime {
    id: string;
    start: number;
    end: number;
}

export const handleAuth = async (): Promise<string> => {
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

export const validateStudyTime = async (
    teacherId: string,
    classId: string,
    sessionId: string,
    startTime: Date,
    endTime: Date,
    actualTime: Date,
    studyHour: number,
    studyMinute: number
): Promise<void> => {
    if (actualTime.getTime() < startTime.getTime()) {
        throw new Error(
            `Study time (${actualTime.toUTCString()}) can not before class's start time (${startTime.toUTCString()})`
        );
    }

    if (actualTime.getTime() > endTime.getTime()) {
        throw new Error(
            `Study time (${actualTime.toUTCString()}) can not after class's end time (${startTime.toUTCString()})`
        );
    }

    const otherSessions = await db.session.findMany({
        where: {
            OR: [
                {classId: classId},
                {
                    class: {
                        teacherId: teacherId,
                    },
                },
            ],
        },
    });

    if (
        isOverlapped(
            otherSessions,
            sessionId,
            actualTime,
            studyHour,
            studyMinute
        )
    ) {
        throw new Error("Overlapped schedule");
    }
};

export const buildAttendanceCreateManySessionInputEnvelope = (
    students: StudentsInClasses[]
): Prisma.AttendanceCreateManySessionInputEnvelope => {
    const attendanceCreateManySessionInputObjs: Prisma.AttendanceCreateManySessionInput[] =
        [];
    students.forEach((student) =>
        attendanceCreateManySessionInputObjs.push({
            studentId: student.studentId,
        } as Prisma.AttendanceCreateManySessionInput)
    );

    return {
        data: attendanceCreateManySessionInputObjs,
        skipDuplicates: true,
    } as Prisma.AttendanceCreateManySessionInputEnvelope;
};

const isBetween = (time: StudyTime, curr: StudyTime): boolean => {
    return (
        (time.start <= curr.start && curr.start < time.end) ||
        (time.start < curr.end && curr.end <= time.end)
    );
};

const isOverlapped = (
    sessions: Session[],
    currId: string,
    startTime: Date,
    studyHour: number,
    studyMinute: number
): boolean => {
    const schedules = sessions.map((s) => {
        const startTime = s.actualStartTime ?? s.estimatedStartTime;
        const endTime = add(startTime, {
            hours: studyHour,
            minutes: studyMinute,
        });
        return {
            id: s.id,
            start: startTime.getTime(),
            end: endTime.getTime(),
        } as StudyTime;
    });

    const studyTime = {
        id: currId,
        start: startTime.getTime(),
        end: add(startTime, {
            hours: studyHour,
            minutes: studyMinute,
        }).getTime(),
    } as StudyTime;

    for (const schedule of schedules) {
        if (schedule.id !== currId && isBetween(schedule, studyTime)) {
            return true;
        }
    }

    return false;
};
