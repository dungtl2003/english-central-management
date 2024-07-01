import {db} from "@/lib/db";
import {buildErrorNextResponse, getClerkRole} from "@/lib/helper";
import {auth, clerkClient} from "@clerk/nextjs/server";
import {UserRole} from "@prisma/client";
import {ApiError} from "next/dist/server/api-utils";
import {NextRequest, NextResponse} from "next/server";
import {
    DeleteResponsePayload,
    AdminGetResponsePayload,
    PatchRequestPayload,
    PatchResponsePayload,
    StudentGetResponsePayload,
} from "./types";
import {ErrorResponsePayload} from "@/constaints";
import {PatchRequestPayloadSchema} from "./schema";
import {adminGetHandler, studentGetHandler} from "./helper";

/**
 * Get student's detail.
 * Admin can access this api.
 * Student with right ID can access this api.
 */
export async function GET(
    req: NextRequest,
    {params}: {params: {studentId: string}}
): Promise<
    NextResponse<
        | AdminGetResponsePayload
        | StudentGetResponsePayload
        | ErrorResponsePayload
    >
> {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("GET ", req.nextUrl.pathname);

    const role: UserRole | null = getClerkRole();
    let result: AdminGetResponsePayload | StudentGetResponsePayload;
    try {
        switch (role) {
            case UserRole.ADMIN:
                result = await adminGetHandler(params.studentId);
                break;
            case UserRole.TEACHER:
                result = await studentGetHandler(params.studentId);
                break;
            default:
                throw new ApiError(400, "No right permission");
        }
        return NextResponse.json<
            AdminGetResponsePayload | StudentGetResponsePayload
        >(result, {status: 200});
    } catch (error) {
        return buildErrorNextResponse(error);
    }
}

/**
 * Update student detail.
 * Only admin can access this api.
 * Admin can only update student's discount.
 */
export async function PATCH(
    req: NextRequest,
    {params}: {params: {studentId: string}}
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

        await db.student.update({
            where: {
                id: params.studentId,
            },
            data: {
                discount: result.data.discount,
            },
        });

        return NextResponse.json<PatchResponsePayload>("Updated student", {
            status: 200,
        });
    } catch (error) {
        return buildErrorNextResponse(error);
    }
}

/**
 * Delete student account.
 * Only admin can access this api.
 */
export async function DELETE(
    req: NextRequest,
    {params}: {params: {studentId: string}}
): Promise<NextResponse<DeleteResponsePayload | ErrorResponsePayload>> {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("DELETE ", req.nextUrl.pathname);

    try {
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

        const student = await db.student.findFirst({
            where: {
                id: params.studentId,
            },
            include: {
                user: true,
            },
        });

        if (!student) {
            throw new ApiError(400, "Student not found");
        }

        if (student.user.deletedAt) {
            throw new ApiError(400, "This student has already been deleted");
        }

        const studyingClass = await db.studentsInClasses.findFirst({
            where: {
                studentId: student.id,
                NOT: {
                    approvedAt: null,
                },
                leftAt: null,
            },
        });

        if (studyingClass) {
            throw new ApiError(
                400,
                "This student is still in some classes, cannot be deleted"
            );
        }

        await db.$transaction(async () => {
            await db.student.update({
                where: {
                    id: params.studentId,
                },
                data: {
                    user: {
                        update: {
                            deletedAt: new Date(),
                        },
                    },
                },
            });
            student.user.referId &&
                (await clerkClient.users.deleteUser(student.user.referId));
        });

        return NextResponse.json<PatchResponsePayload>("Deleted student", {
            status: 200,
        });
    } catch (error) {
        return buildErrorNextResponse(error);
    }
}
