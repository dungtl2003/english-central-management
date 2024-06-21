import {db} from "@/lib/db";
import {NextRequest, NextResponse} from "next/server";
import {buildErrorNextResponse, getClerkRole} from "@/lib/helper";
import {ApiError} from "next/dist/server/api-utils";
import {PatchRequestPayload, PatchResponsePayload} from "./types";
import {ErrorResponsePayload, UserRole} from "@/constaints";
import {PatchRequestPayloadSchema} from "./schema";
import {buildAttendanceUpdateQueries} from "./helper";
import {auth} from "@clerk/nextjs/server";

/**
 * Update attendances.
 * Only teacher with right ID can access this api.
 */
export async function PATCH(
    req: NextRequest
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

        if (!user) {
            throw new ApiError(401, "Account not found");
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
                id: validBody.data.sessionId,
                class: {
                    teacherId: user.teacher!.id,
                },
            },
        });

        if (!session) {
            throw new ApiError(
                400,
                `Cannot find session with ID ${validBody.data.sessionId} in the database`
            );
        }

        await db.$transaction([
            db.session.update({
                where: {
                    id: session.id,
                },
                data: {
                    attendedTime: session.attendedTime ?? new Date(),
                },
                // TESTING: only for testing purpose
                //data: {
                //    attendedTime:
                //        session.attendedTime ?? session.actualStartTime,
                //},
            }),
            ...buildAttendanceUpdateQueries(
                session.id,
                validBody.data.attendances
            ),
        ]);

        return NextResponse.json<PatchResponsePayload>("Updated attendances", {
            status: 200,
        });
    } catch (error) {
        return buildErrorNextResponse(error);
    }
}
