import {db} from "@/lib/db";
import {Prisma, Session, StudentsInClasses} from "@prisma/client";
import {add} from "date-fns";
import {ApiError} from "next/dist/server/api-utils";

interface StudyTime {
    id: string;
    start: number;
    end: number;
}

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
    const actualStartTime = new Date(actualTime);
    const actualEndTime = add(actualStartTime, {
        hours: studyHour,
        minutes: studyMinute,
    });

    if (actualStartTime.getTime() < startTime.getTime()) {
        throw new ApiError(
            400,
            `Study start time (${actualStartTime.toUTCString()}) can not before class's start time (${startTime.toUTCString()})`
        );
    }

    if (actualEndTime.getTime() > endTime.getTime()) {
        throw new ApiError(
            400,
            `Study end time (${actualEndTime.toUTCString()}) can not after class's end time (${startTime.toUTCString()})`
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
        throw new ApiError(400, "Overlapped schedule");
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
