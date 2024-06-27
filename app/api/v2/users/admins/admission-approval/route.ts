import {NextRequest, NextResponse} from "next/server";
import {ErrorResponsePayload, UserRole} from "@/constaints";
import {buildErrorNextResponse, getClerkRole} from "@/lib/helper";
import {auth} from "@clerk/nextjs/server";
import {ApiError} from "next/dist/server/api-utils";
import {db} from "@/lib/db";
import {PatchRequestPayload, PatchResponsePayload} from "./types";
import {Action, PatchRequestPayloadSchema} from "./schema";
import {Prisma} from "@prisma/client";

/**
 * Approve or reject student.
 * Only admin can access this api.
 */
export async function PATCH(
    req: NextRequest
): Promise<NextResponse<PatchResponsePayload | ErrorResponsePayload>> {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("PATCH ", req.nextUrl.pathname);

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

        const body: PatchRequestPayload = await req.json();
        const result = PatchRequestPayloadSchema.safeParse(body);
        if (result.error) {
            throw new ApiError(
                400,
                JSON.stringify(result.error.flatten().fieldErrors)
            );
        }

        const data: Prisma.StudentsInClassesUpdateInput = {};
        switch (result.data.action) {
            case Action.APPROVE:
                data.approvedAt = new Date();
                break;
            case Action.REJECT:
                data.rejectedAt = new Date();
                break;
            default:
                throw new ApiError(400, "Unsupported action");
        }

        await db.studentsInClasses.update({
            where: {
                classId_studentId: {
                    classId: result.data.classId,
                    studentId: result.data.studentId,
                },
            },
            data: data,
        });

        return NextResponse.json<PatchResponsePayload>(
            "Successful approval proccess",
            {
                status: 200,
            }
        );
    } catch (error) {
        return buildErrorNextResponse(error);
    }
}
