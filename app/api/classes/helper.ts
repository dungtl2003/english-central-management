import {Time} from "@/lib/time";
import {Schedule} from "./schema";
import {Prisma, UserRole} from "@prisma/client";
import {getClerkRole} from "@/lib/helper";
import {auth} from "@clerk/nextjs/server";
import {db} from "@/lib/db";

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

export async function authGetHandler(): Promise<void> {
    const clerkUserId = auth().userId;
    const role: UserRole | null = getClerkRole();

    if (!clerkUserId) {
        throw new Error("No signed in user");
    }

    const user = await db.user.findFirst({
        where: {
            referId: clerkUserId,
            role: role as UserRole,
        },
    });

    if (!user) {
        throw new Error(
            `Cannot find account with id ${clerkUserId} in database`
        );
    }
}

export async function authPostHandler(): Promise<void> {
    const clerkUserId = auth().userId;
    const role: UserRole | null = getClerkRole();

    if (!clerkUserId) {
        throw new Error("No signed in user");
    }

    if (!role || role !== UserRole.ADMIN) {
        throw Error("No right permission");
    }

    const admin = await db.user.findFirst({
        where: {
            referId: clerkUserId!,
            role: "ADMIN",
        },
    });

    if (!admin) {
        throw new Error(
            `No admin with refer ID ${clerkUserId} found in database`
        );
    }
}
