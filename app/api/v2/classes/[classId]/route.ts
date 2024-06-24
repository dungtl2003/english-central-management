import {NextRequest, NextResponse} from "next/server";
import {adminGetHandler, teacherGetHandler} from "./helper";
import {UserRole} from "@prisma/client";
import {buildErrorNextResponse, getClerkRole} from "@/lib/helper";
import {ApiError} from "next/dist/server/api-utils";
import {AdminGetResponsePayload, TeacherGetResponsePayload} from "./types";
import {ErrorResponsePayload} from "@/constaints";

/**
 * Get class's detail information.
 * Admin can access this api.
 * Teacher with right ID can get access this api.
 */
export async function GET(
    req: NextRequest,
    {params}: {params: {classId: string}}
): Promise<
    NextResponse<
        | AdminGetResponsePayload
        | TeacherGetResponsePayload
        | ErrorResponsePayload
    >
> {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("GET ", req.nextUrl.pathname);

    const role: UserRole | null = getClerkRole();
    let result: AdminGetResponsePayload | TeacherGetResponsePayload;
    try {
        switch (role) {
            case UserRole.ADMIN:
                result = await adminGetHandler(params.classId);
                break;
            case UserRole.TEACHER:
                result = await teacherGetHandler(params.classId);
                break;
            default:
                throw new ApiError(400, "No right permission");
        }

        return NextResponse.json<
            AdminGetResponsePayload | TeacherGetResponsePayload
        >(result, {status: 200});
    } catch (error) {
        return buildErrorNextResponse(error);
    }
}
