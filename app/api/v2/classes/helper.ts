import {db} from "@/lib/db";
import {getClerkRole} from "@/lib/helper";
import {auth} from "@clerk/nextjs/server";
import {Prisma, UserRole} from "@prisma/client";
import {AdminGetQueryParamsSchema} from "./schema";
import {ApiError} from "next/dist/server/api-utils";
import {Json} from "@/constaints";
import {AdminGetQueryParams, AdminGetResponsePayload, Schedule} from "./types";
import {Time} from "@/lib/time";

export async function adminGetHandler(
    params: Json
): Promise<AdminGetResponsePayload> {
    const clerkUserId = auth().userId;
    const role: UserRole | null = getClerkRole();

    if (!clerkUserId) {
        throw new ApiError(401, "No signed in user");
    }

    if (!role || role !== UserRole.ADMIN) {
        throw new ApiError(401, "No right permission");
    }

    const user = await db.user.findFirst({
        where: {
            referId: clerkUserId,
            role: UserRole.ADMIN,
        },
    });

    if (!user) {
        throw new ApiError(401, `Account not found`);
    }

    const queryParams: AdminGetQueryParams = params;
    const validParams = AdminGetQueryParamsSchema.safeParse(queryParams);
    if (!validParams.success) {
        throw new ApiError(
            400,
            JSON.stringify(validParams.error.flatten().fieldErrors)
        );
    }
    const classes = await db.class.findMany({
        where: {
            teacherId: queryParams.teacherId,
        },
        include: {
            unit: true,
            students: true,
        },
    });

    const result: AdminGetResponsePayload = classes.map((c) => {
        return {
            ...c,
            numOfJoinedStudents: c.students.filter(
                (s) => s.approvedAt && !s.leftAt
            ).length,
            numOfPendingStudents: c.students.filter(
                (s) =>
                    s.registeredAt &&
                    !s.leftAt &&
                    !s.approvedAt &&
                    !s.rejectedAt
            ).length,
        };
    });

    return result;
}

export interface ScheduleTimesSameDay {
    [dayOfWeek: string]: Time[];
}

export function validateScheduleTime(
    sortedScheduleTimesSameDay: ScheduleTimesSameDay,
    studyTimeInSeconds: number
): void {
    let dayOfWeek: keyof ScheduleTimesSameDay;
    for (dayOfWeek in sortedScheduleTimesSameDay) {
        const sortedTimes = sortedScheduleTimesSameDay[dayOfWeek];

        for (let i: number = 1; i < sortedTimes.length; i++) {
            const currSeconds = sortedTimes[i].toSeconds();
            const prevSeconds = sortedTimes[i - 1].toSeconds();
            if (currSeconds - prevSeconds < studyTimeInSeconds) {
                throw Error("There are schedules overlapping");
            }
        }
    }
}

export function groupAndSortScheduleTimesInSameDay(
    schedules: Schedule[]
): ScheduleTimesSameDay {
    const scheduleTimesSameDay = schedules.reduce(
        (prev, curr) => ({
            ...prev,
            [String(curr.dayOfWeek)]: [
                ...(prev[String(curr.dayOfWeek)] || []),
                new Time(curr.startHour, curr.startMinute, curr.startSecond),
            ],
        }),
        {} as ScheduleTimesSameDay
    )!;

    let dayOfWeek: keyof ScheduleTimesSameDay;
    for (dayOfWeek in scheduleTimesSameDay) {
        scheduleTimesSameDay[dayOfWeek] = scheduleTimesSameDay[dayOfWeek].sort(
            (time1: Time, time2: Time) => time1.compareTo(time2)
        );
    }

    return scheduleTimesSameDay;
}

export function buildSortedSessionDates(
    scheduleTimesSameDay: ScheduleTimesSameDay,
    totalSessions: number,
    startDate: Date,
    timezone: string
): Date[] {
    const sessionDates: Date[] = [];

    const curr = new Date(startDate);
    while (sessionDates.length < totalSessions) {
        if (String(curr.getDay()) in scheduleTimesSameDay) {
            const timesInDay: Time[] =
                scheduleTimesSameDay[String(curr.getDay())];

            for (const time of timesInDay) {
                sessionDates.push(
                    new Date(
                        `${curr.toLocaleDateString("sv-SE", {timeZone: timezone})}T${time.toString()}`
                    )
                );

                if (sessionDates.length === totalSessions) {
                    break;
                }
            }
        }

        curr.setDate(curr.getDate() + 1);
    }

    return sessionDates;
}

export function buildScheduleCreateManyClassInputEnvelopeObject(
    schedules: Schedule[]
): Prisma.ScheduleCreateManyClassInputEnvelope {
    const scheduleCreateManyClassInputObj: Prisma.ScheduleCreateManyClassInput[] =
        schedules.map((schedule) => {
            return {
                dayOfWeek: schedule.dayOfWeek,
                startHour: schedule.startHour,
                startMinute: schedule.startMinute,
                startSecond: schedule.startSecond,
                location: schedule.location,
            } as Prisma.ScheduleCreateManyClassInput;
        });

    return {
        data: scheduleCreateManyClassInputObj,
        skipDuplicates: true,
    };
}

export function buildSessionCreateManyClassInputEnvelopeObject(
    sessionDates: Date[]
): Prisma.SessionCreateManyClassInputEnvelope {
    const sessionCreateManyClassInputObj: Prisma.SessionCreateManyClassInput[] =
        sessionDates.map((sessionDate) => {
            return {
                estimatedStartTime: sessionDate,
            } as Prisma.SessionCreateManyClassInput;
        });

    return {
        data: sessionCreateManyClassInputObj,
        skipDuplicates: true,
    };
}
