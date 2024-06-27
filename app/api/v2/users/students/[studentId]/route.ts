import {db} from "@/lib/db";
import {buildErrorNextResponse, getClerkRole} from "@/lib/helper";
import {auth} from "@clerk/nextjs/server";
import {UserRole} from "@prisma/client";
import {ApiError} from "next/dist/server/api-utils";
import {NextRequest, NextResponse} from "next/server";
import {
    GetResponsePayload,
    PatchRequestPayload,
    PatchResponsePayload,
} from "./types";
import {ErrorResponsePayload} from "@/constaints";
import {PatchRequestPayloadSchema} from "./schema";

/**
 * Get student's detail.
 * Only admin can access this api.
 */
export async function GET(
    req: NextRequest,
    {params}: {params: {studentId: string}}
): Promise<NextResponse<GetResponsePayload | ErrorResponsePayload>> {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("GET ", req.nextUrl.pathname);

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

        const student = await db.student.findFirst({
            where: {
                id: params.studentId,
            },
            include: {
                user: true,
            },
        });

        if (!student) {
            throw new ApiError(
                400,
                `No student with ID ${params.studentId} found`
            );
        }

        const [parents, classes] = await Promise.all([
            db.childrenParents.findMany({
                where: {
                    childId: params.studentId,
                },
                include: {
                    parent: {
                        include: {
                            user: true,
                        },
                    },
                },
            }),
            db.studentsInClasses.findMany({
                where: {
                    studentId: params.studentId,
                },
                include: {
                    class: {
                        include: {
                            unit: true,
                            students: {
                                where: {
                                    NOT: {
                                        approvedAt: null,
                                    },
                                    leftAt: null,
                                },
                            },
                            sessions: {
                                where: {
                                    attendances: {
                                        some: {
                                            studentId: params.studentId,
                                        },
                                    },
                                },
                                include: {
                                    attendances: {
                                        where: {
                                            studentId: params.studentId,
                                        },
                                    },
                                },
                            },
                            tuitions: {
                                where: {
                                    childId: params.studentId,
                                },
                            },
                        },
                    },
                },
            }),
        ]);

        const result: GetResponsePayload = {
            ...student,
            parents: parents.map((p) => p.parent),
            classes: classes.map((c) => c.class),
        };

        return NextResponse.json<GetResponsePayload>(result, {status: 200});
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
