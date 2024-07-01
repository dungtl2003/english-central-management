export const dynamic = "force-dynamic";

import {db} from "@/lib/db";
import {buildErrorNextResponse, getClerkRole} from "@/lib/helper";
import {auth} from "@clerk/nextjs/server";
import {Prisma, UserRole} from "@prisma/client";
import {ApiError} from "next/dist/server/api-utils";
import {NextRequest, NextResponse} from "next/server";
import {
    GetResponsePayload,
    PostRequestPayload,
    PostResponsePayload,
} from "./types";
import {PostRequestPayloadSchema} from "./schema";
import {ErrorResponsePayload} from "@/constaints";

/**
 * Get units.
 * Only admin can access this api.
 */
export async function GET(
    req: NextRequest
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

        const units = await db.unit.findMany({});

        return NextResponse.json<GetResponsePayload>(units, {
            status: 200,
        });
    } catch (error) {
        return buildErrorNextResponse(error);
    }
}

/**
 * Add unit.
 * Only admin can access this api.
 */
export async function POST(req: NextRequest): Promise<NextResponse> {
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

        await db.unit.create({
            data: {
                year: validBody.data!.year,
                grade: validBody.data!.grade,
                maxSessions: validBody.data!.maxSessions,
                maxStudents: validBody.data!.maxStudents,
                studyHour: validBody.data!.studyHour,
                studyMinute: validBody.data!.studyMinute,
                studySecond: validBody.data!.studySecond,
                pricePerSession: new Prisma.Decimal(
                    validBody.data!.pricePerSession
                ),
            },
        });

        return NextResponse.json<PostResponsePayload>("Added unit", {
            status: 200,
        });
    } catch (error) {
        return buildErrorNextResponse(error);
    }
}
