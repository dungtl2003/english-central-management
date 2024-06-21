import {NextRequest, NextResponse} from "next/server";
import {db} from "@/lib/db";
import {buildErrorNextResponse, getClerkRole} from "@/lib/helper";
import {GetResponsePayload} from "./types";
import {ErrorResponsePayload, UserRole} from "@/constaints";
import {auth} from "@clerk/nextjs/server";
import {ApiError} from "next/dist/server/api-utils";

/**
 * Get classes from a teacher.
 * Teacher can access this api.
 */
export async function GET(
    req: NextRequest,
    {params}: {params: {teacherId: string}}
): Promise<NextResponse<GetResponsePayload | ErrorResponsePayload>> {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("GET ", req.url);

    try {
        const clerkUserId = auth().userId;
        const role: UserRole | null = getClerkRole();

        if (!clerkUserId) {
            throw new ApiError(401, "No signed in user");
        }

        if (!role || role !== UserRole.TEACHER) {
            throw new ApiError(401, "No right permission");
        }

        const teacher = await db.user.findFirst({
            where: {
                teacher: {
                    id: params.teacherId,
                },
                referId: clerkUserId,
                role: UserRole.TEACHER,
            },
        });

        if (!teacher) {
            throw new ApiError(401, `Account not found`);
        }

        const classes: GetResponsePayload = await db.class.findMany({
            where: {
                teacherId: params.teacherId,
            },
            include: {
                unit: true,
                teacher: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        return NextResponse.json<GetResponsePayload>(classes, {status: 200});
    } catch (error) {
        return buildErrorNextResponse(error);
    }
}
