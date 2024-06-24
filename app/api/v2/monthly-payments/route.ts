import {buildErrorNextResponse, getClerkRole} from "@/lib/helper";
import {auth} from "@clerk/nextjs/server";
import {Prisma, UserRole} from "@prisma/client";
import {ApiError} from "next/dist/server/api-utils";
import {NextRequest, NextResponse} from "next/server";
import {PostRequestPayload, PostResponsePayload} from "./types";
import {PostRequestPayloadSchema} from "./schema";
import {db} from "@/lib/db";

/**
 * Pay teacher.
 * Only admin can access this api.
 */
export async function POST(req: NextRequest) {
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

        const data: Prisma.MonthlyPaymentCreateManyInput[] = [];
        result.data.monthlyPayments.forEach((payment) => {
            data.push({
                teacherId: result.data.teacherId,
                month: payment.month,
                year: payment.year,
                salary: payment.salary,
            } as Prisma.MonthlyPaymentCreateManyInput);
        });
        await db.monthlyPayment.createMany({
            data: data,
        });

        return NextResponse.json<PostResponsePayload>("Created payments", {
            status: 200,
        });
    } catch (error) {
        return buildErrorNextResponse(error);
    }
}
