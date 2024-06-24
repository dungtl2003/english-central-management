import {NextRequest, NextResponse} from "next/server";
import {PostRequestPayloadSchema} from "./schema";
import {db} from "@/lib/db";
import {Prisma, UserRole} from "@prisma/client";
import {buildErrorNextResponse, getClerkRole} from "@/lib/helper";
import {auth} from "@clerk/nextjs/server";
import {ApiError} from "next/dist/server/api-utils";
import {PostRequestPayload, PostResponsePayload} from "./types";
import {ErrorResponsePayload} from "@/constaints";

/**
 * Perform student's payments.
 * Only teacher with right teacher ID, student ID, class ID can perform this api.
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

        if (!role || role !== UserRole.TEACHER) {
            throw new ApiError(401, "No right permission");
        }

        const user = await db.user.findFirst({
            where: {
                referId: clerkUserId,
                role: UserRole.TEACHER,
            },
            include: {
                teacher: true,
            },
        });

        if (!user) {
            throw new ApiError(401, "Account not found");
        }

        const body: PostRequestPayload = await req.json();
        const result = PostRequestPayloadSchema.safeParse(body);
        if (result.error) {
            throw new ApiError(
                400,
                JSON.stringify(result.error.flatten().fieldErrors)
            );
        }

        const cls = await db.class.findFirst({
            where: {
                id: result.data.classId,
                teacherId: user.teacher!.id,
                students: {
                    some: {
                        studentId: result.data.studentId,
                    },
                },
            },
        });
        if (!cls) {
            throw new ApiError(401, "No right permission");
        }

        const data: Prisma.TuitionCreateManyInput[] = [];
        result.data.payments.forEach((payment) => {
            data.push({
                childId: result.data.studentId,
                parentId: result.data.parentId,
                classId: result.data.classId,
                amount: payment.amount,
                year: payment.year,
                month: payment.month,
                discount: result.data.discount,
            });
        });

        await db.tuition.createMany({
            data: data,
        });

        return NextResponse.json<PostResponsePayload>("Succeed payment", {
            status: 200,
        });
    } catch (error) {
        return buildErrorNextResponse(error);
    }
}
