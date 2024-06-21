import {db} from "@/lib/db";
import {buildErrorNextResponse, getClerkRole} from "@/lib/helper";
import {auth} from "@clerk/nextjs/server";
import {UserRole} from "@prisma/client";
import {ApiError} from "next/dist/server/api-utils";
import {NextRequest, NextResponse} from "next/server";
import {GetResponsePayload} from "./types";
import {ErrorResponsePayload} from "@/constaints";

export async function GET(
    req: NextRequest
): Promise<NextResponse<GetResponsePayload | ErrorResponsePayload>> {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("GET ", req.nextUrl.pathname);

    const clerkUserId = auth().userId;
    const role: UserRole | null = getClerkRole();

    try {
        if (!clerkUserId) {
            throw new ApiError(401, "No signed in user");
        }

        if (!role) {
            throw new ApiError(401, "No right permission");
        }

        const user = await db.user.findFirst({
            where: {
                referId: clerkUserId as string,
            },
            include: {
                admin: true,
                teacher: true,
                parent: true,
                student: true,
            },
        });

        if (!user) {
            throw new ApiError(401, "Account not found");
        }

        let userId: string;
        switch (role) {
            case UserRole.ADMIN:
                userId = user.admin!.id;
                break;
            case UserRole.TEACHER:
                userId = user.teacher!.id;
                break;
            case UserRole.PARENT:
                userId = user.parent!.id;
                break;
            case UserRole.STUDENT:
                userId = user.student!.id;
                break;
            default:
                throw new ApiError(500, "Unsupported role");
        }

        return NextResponse.json<GetResponsePayload>(userId, {status: 200});
    } catch (error) {
        return buildErrorNextResponse(error);
    }
}
