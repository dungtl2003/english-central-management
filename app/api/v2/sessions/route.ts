import {db} from "@/lib/db";
import {NextRequest, NextResponse} from "next/server";
import {buildErrorNextResponse, getClerkRole} from "@/lib/helper";
import {auth} from "@clerk/nextjs/server";
import {UserRole} from "@prisma/client";
import {GetResponsePayload} from "./types";
import {ErrorResponsePayload} from "@/constaints";
import {ApiError} from "next/dist/server/api-utils";

/**
 * Get sessions and class, teacher's details along each session.
 * Only admin can access this api.
 */
export async function GET(
    req: NextRequest
): Promise<NextResponse<GetResponsePayload | ErrorResponsePayload>> {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("GET ", req.url);

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
                referId: clerkUserId!,
                role: UserRole.ADMIN,
            },
        });

        if (!admin) {
            throw new ApiError(401, `Account not found`);
        }

        const sessions = await db.session.findMany({
            include: {
                class: {
                    include: {
                        unit: true,
                        teacher: {
                            include: {
                                user: true,
                            },
                        },
                    },
                },
            },
        });

        return NextResponse.json<GetResponsePayload>(sessions, {status: 200});
    } catch (error) {
        return buildErrorNextResponse(error);
    }
}
