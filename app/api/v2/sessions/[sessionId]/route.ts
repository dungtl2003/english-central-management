import {db} from "@/lib/db";
import {NextRequest, NextResponse} from "next/server";
import {
    buildAttendanceCreateManySessionInputEnvelope,
    validateStudyTime,
} from "./helper";
import {buildErrorNextResponse, getClerkRole} from "@/lib/helper";
import {ApiError} from "next/dist/server/api-utils";
import {PatchRequestPayload, PatchResponsePayload} from "./types";
import {ErrorResponsePayload, UserRole} from "@/constaints";
import {PatchRequestPayloadSchema} from "./schema";
import {auth} from "@clerk/nextjs/server";

/**
 * Update session actual study time.
 * Only teacher with right ID can access this api.
 * Actual study time must not overlap with other time that the teacher teach.
 * Actual study time must not be before class's start time or after class's end
 * time.
 */
export async function PATCH(
    req: NextRequest,
    {params}: {params: {sessionId: string}}
): Promise<NextResponse<PatchResponsePayload | ErrorResponsePayload>> {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("PATCH ", req.url);

    try {
        const clerkUserId = auth().userId;
        const role: UserRole | null = getClerkRole();

        if (!clerkUserId) {
            throw new ApiError(401, "No signed in user");
        }

        if (!role || role !== UserRole.TEACHER) {
            throw new ApiError(401, "No right permission");
        }

        const user = await db.user.findFirst({
            where: {
                referId: clerkUserId!,
                role: UserRole.TEACHER,
            },
            include: {
                teacher: true,
            },
        });

        if (!user || !user.teacher) {
            throw new ApiError(401, `Acocunt not found`);
        }

        const body: PatchRequestPayload = await req.json();
        const validBody = PatchRequestPayloadSchema.safeParse(body);
        if (validBody.error) {
            throw new ApiError(
                400,
                JSON.stringify(validBody.error.flatten().fieldErrors)
            );
        }

        const session = await db.session.findFirst({
            where: {
                id: params.sessionId,
                class: {
                    teacherId: user.teacher.id,
                },
            },

            include: {
                class: {
                    include: {
                        unit: true,
                    },
                },
            },
        });

        if (!session) {
            throw new ApiError(400, "No session found");
        }

        if (session.actualStartTime) {
            throw new ApiError(400, "Start time in session is already set");
        }

        await validateStudyTime(
            user.teacher.id,
            session.class.id,
            session.id,
            new Date(session.class.startTime),
            new Date(session.class.endTime),
            new Date(validBody.data.actualTime),
            session.class.unit.studyHour,
            session.class.unit.studyMinute
        );

        const students = await db.studentsInClasses.findMany({
            where: {
                classId: session!.classId,
                approvedAt: {
                    lte: validBody.data.actualTime,
                },
            },
        });

        await db.session.update({
            where: {
                id: session!.id,
            },
            data: {
                actualStartTime: validBody.data.actualTime,
                updatedAt: new Date(),
                attendances: {
                    createMany:
                        buildAttendanceCreateManySessionInputEnvelope(students),
                },
            },
        });

        return NextResponse.json<PatchResponsePayload>("Updated session", {
            status: 200,
        });
    } catch (error) {
        return buildErrorNextResponse(error);
    }
}
