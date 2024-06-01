import {NextRequest, NextResponse} from "next/server";
import {BaseQueryParams, Post, PostSchema, getSchemaByRole} from "./schema";
import {db} from "@/lib/db";
import {Json} from "@/constaints";
import {
    authHandler,
    convertQueryParamsToJsonObject,
    getClerkRole,
} from "@/lib/helper";
import {UserRole} from "@prisma/client";
import {auth} from "@clerk/nextjs/server";
import {
    authPostRequest,
    buildScheduleCreateManyClassInputEnvelopeObject,
    buildSessionCreateManyClassInputEnvelopeObject,
    buildSortedSessionDates,
    groupAndSortScheduleTimesInSameDay,
    validateScheduleTime,
} from "./helper";
import {Time} from "@/lib/time";

/**
 * Get classes.
 * This will return the class, unit and teacher.
 * Admin gets all classes.
 * Teacher gets all classes he/she teaches.
 * Student gets all classes.
 * Parent gets all classes.
 */
export async function GET(req: NextRequest) {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("GET ", req.url);

    try {
        await authHandler();
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

    try {
        await authPostRequest();
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return NextResponse.json({error: "No right permission"}, {status: 401});
    }

    const body: Post = await req.json();
    const validBody = PostSchema.safeParse(body);
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
        validateScheduleTime(sortedScheduleTimesSameDay, studyTime.toSeconds());
        const sortedSessionDates = buildSortedSessionDates(
            sortedScheduleTimesSameDay,
            unit!.maxSessions,
            validBody.data!.startDate,
            validBody.data!.timeZone
        );
        const endDate = sortedSessionDates[sortedSessionDates.length - 1];

        const _class = await db.class.create({
            data: {
                unitId: validBody.data!.unitId,
                teacherId: user!.teacher!.id,
                startTime: validBody.data!.startDate,
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

        console.log("Created class: ", _class);
        return NextResponse.json(_class, {status: 200});
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return NextResponse.json(
            {error: "Failed to create class"},
            {status: 500}
        );
    }
}
