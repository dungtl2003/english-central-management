export const dynamic = "force-dynamic";

import {NextRequest, NextResponse} from "next/server";
import {
    adminGetHandler,
    buildScheduleCreateManyClassInputEnvelopeObject,
    buildSessionCreateManyClassInputEnvelopeObject,
    buildSortedSessionDates,
    groupAndSortScheduleTimesInSameDay,
    validateScheduleTime,
} from "./helper";
import {UserRole} from "@prisma/client";
import {
    buildErrorNextResponse,
    convertQueryParamsToJsonObject,
    getClerkRole,
} from "@/lib/helper";
import {ErrorResponsePayload, Json} from "@/constaints";
import {
    AdminGetResponsePayload,
    PostRequestPayload,
    PostResponsePayload,
} from "./types";
import {ApiError} from "next/dist/server/api-utils";
import {PostRequestPayloadSchema} from "./schema";
import {auth} from "@clerk/nextjs/server";
import {db} from "@/lib/db";
import {Time} from "@/lib/time";
import {add} from "date-fns";

/**
 * Get classes.
 * Admin gets all classes.
 * Student gets all classes.
 * Parent gets all classes.
 */
export async function GET(
    req: NextRequest
): Promise<NextResponse<AdminGetResponsePayload | ErrorResponsePayload>> {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("GET ", req.url);

    try {
        const role: UserRole | null = getClerkRole();
        let result: AdminGetResponsePayload;
        const jsonObj: Json = convertQueryParamsToJsonObject(
            req.nextUrl.searchParams
        );
        switch (role) {
            case UserRole.ADMIN:
                result = await adminGetHandler(jsonObj);
                break;
            default:
                throw new ApiError(400, "No right permission");
        }

        return NextResponse.json<AdminGetResponsePayload>(result, {
            status: 200,
        });
    } catch (error) {
        return buildErrorNextResponse(error);
    }
}

/**
 * Add class.
 * Only admin can use this api.
 */
export async function POST(
    req: NextRequest
): Promise<NextResponse<PostResponsePayload | ErrorResponsePayload>> {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("POST ", req.nextUrl.pathname);

    try {
        const clerkUserId = auth().userId;
        const role: UserRole | null = getClerkRole();

        if (!clerkUserId) {
            throw new ApiError(401, "No signed in user");
        }

        if (!role || role !== UserRole.ADMIN) {
            throw new ApiError(401, "No right permission");
        }

        const admin = await db.user.findFirst({
            where: {
                referId: clerkUserId,
                role: UserRole.ADMIN,
            },
        });

        if (!admin) {
            throw new ApiError(401, `Account not found`);
        }

        const body: PostRequestPayload = await req.json();
        const validBody = PostRequestPayloadSchema.safeParse(body);
        if (validBody.error) {
            throw new ApiError(
                400,
                JSON.stringify(validBody.error.flatten().fieldErrors)
            );
        }

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

        await db.class.create({
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
        });

        return NextResponse.json<PostResponsePayload>("Added class", {
            status: 200,
        });
    } catch (error) {
        return buildErrorNextResponse(error);
    }
}
