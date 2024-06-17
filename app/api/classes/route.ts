import {NextRequest, NextResponse} from "next/server";
import {
    BaseQueryParams,
    PostClass,
    PostClassSchema,
    getSchemaByRole,
} from "./schema";
import {db} from "@/lib/db";
import {Json} from "@/constaints";
import {convertQueryParamsToJsonObject, getClerkRole} from "@/lib/helper";
import {UserRole} from "@prisma/client";
import {auth} from "@clerk/nextjs/server";
import {
    authGetHandler,
    authPostHandler,
    buildScheduleCreateManyClassInputEnvelopeObject,
    buildSessionCreateManyClassInputEnvelopeObject,
    buildSortedSessionDates,
    groupAndSortScheduleTimesInSameDay,
    validateScheduleTime,
} from "./helper";
import {Time} from "@/lib/time";
import {add} from "date-fns";

/**
 * Get classes.
 * This will return the class, unit and teacher.
 * Admin gets all classes.
 * Student gets all classes.
 * Parent gets all classes.
 */
export async function GET(req: NextRequest) {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("GET ", req.url);

    try {
        await authGetHandler();
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return new NextResponse((<Error>error).message, {status: 401});
    }

    const role: UserRole | null = getClerkRole();
    const clerkUserId = auth().userId;
    const jsonObj: Json = convertQueryParamsToJsonObject(
        req.nextUrl.searchParams
    );
    const queryParams: BaseQueryParams = jsonObj;
    if (
        !role ||
        (role === UserRole.TEACHER && queryParams.teacherId !== clerkUserId)
    ) {
        console.log("Error: No right permission");
        return NextResponse.json({error: "No right permission"}, {status: 401});
    }

    const result = getSchemaByRole(role).safeParse(queryParams);
    if (!result.success) {
        console.log("Error: ", result.error.flatten());
        return NextResponse.json({error: "Wrong query param"}, {status: 400});
    }

    try {
        const user = await db.user.findFirst({
            where: {
                referId: queryParams.teacherId,
            },

            select: {
                teacher: {
                    select: {
                        id: true,
                    },
                },
            },
        });
        const classes = await db.class.findMany({
            where: {
                teacherId: user!.teacher!.id,
            },
            include: {
                unit: true,
                teacher: {
                    select: {
                        user: true,
                    },
                },
            },
        });
        return NextResponse.json(classes, {status: 200});
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return NextResponse.json(
            {error: "Failed to get classes"},
            {status: 500}
        );
    }
}

/**
 * Add class.
 * Only admin can use this api.
 */
export async function POST(req: NextRequest) {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("POST ", req.nextUrl.pathname);

    //TESTING
    try {
        await authPostHandler();
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return NextResponse.json({error: "No right permission"}, {status: 401});
    }

    const body: PostClass = await req.json();
    const validBody = PostClassSchema.safeParse(body);
    if (validBody.error) {
        console.log("Error: ", validBody.error.flatten());
        return NextResponse.json({error: "Wrong body format"}, {status: 400});
    }

    try {
        const unit = await db.unit.findFirst({
            where: {
                id: validBody.data!.unitId,
            },
        });

        const user = await db.user.findFirst({
            where: {
                referId: validBody.data!.teacherId,
            },
            select: {
                teacher: {
                    select: {
                        id: true,
                    },
                },
            },
        });

        const classes = await db.class.findMany({
            where: {
                unitId: validBody.data!.unitId,
            },
        });
        const numberOfClasses = classes.length;

        const studyTime = new Time(
            unit!.studyHour,
            unit!.studyMinute,
            unit!.studySecond
        );
        const sortedScheduleTimesSameDay = groupAndSortScheduleTimesInSameDay(
            validBody.data!.schedules
        );

        const startDate = new Date(validBody.data!.startDate);
        startDate.setUTCHours(0);
        startDate.setUTCMinutes(0);
        startDate.setUTCSeconds(0);
        startDate.setUTCMilliseconds(0);

        validateScheduleTime(sortedScheduleTimesSameDay, studyTime.toSeconds());
        const sortedSessionDates = buildSortedSessionDates(
            sortedScheduleTimesSameDay,
            unit!.maxSessions,
            startDate,
            validBody.data!.timeZone
        );
        const endDate = add(sortedSessionDates[sortedSessionDates.length - 1], {
            hours: unit!.studyHour,
            minutes: unit!.studyMinute,
        });

        const _class = await db.class.create({
            data: {
                unitId: validBody.data!.unitId,
                teacherId: user!.teacher!.id,
                startTime: startDate,
                endTime: endDate,
                index: numberOfClasses + 1,
                timeZone: validBody.data!.timeZone,
                schedules: {
                    createMany: buildScheduleCreateManyClassInputEnvelopeObject(
                        validBody.data!.schedules
                    ),
                },
                sessions: {
                    createMany:
                        buildSessionCreateManyClassInputEnvelopeObject(
                            sortedSessionDates
                        ),
                },
            },

            include: {
                schedules: true,
                sessions: true,
            },
        });

        return NextResponse.json(_class, {status: 200});
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return NextResponse.json(
            {error: "Failed to create class"},
            {status: 500}
        );
    }
}
