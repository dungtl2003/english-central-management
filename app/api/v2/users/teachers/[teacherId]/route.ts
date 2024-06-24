import {NextRequest, NextResponse} from "next/server";
import {buildErrorNextResponse, getClerkRole} from "@/lib/helper";
import {ApiError} from "next/dist/server/api-utils";
import {ErrorResponsePayload, UserRole} from "@/constaints";
import {
    teacherGetHandler,
    adminGetHandler,
    adminPatchHandler,
    teacherPatchHandler,
    adminDeleteHandler,
    teacherDeleteHandler,
} from "./helper";
import {
    AdminDeleteResponsePayload,
    AdminGetResponsePayload,
    AdminPatchResponsePayload,
    TeacherDeleteResponsePayload,
    TeacherGetResponsePayload,
    TeacherPatchResponsePayload,
} from "./types";

/**
 * Get teacher's detail information.
 * Only teacher can use this api (with him/her's ID).
 */
export async function GET(
    req: NextRequest,
    {params}: {params: {teacherId: string}}
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
                result = await adminGetHandler(params.teacherId);
                break;
            case UserRole.TEACHER:
                result = await teacherGetHandler(params.teacherId);
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

/**
 * Update teacher's information.
 * Teacher can update everything EXCEPT base salary.
 * Admin can update teacher's status and base salary only.
 * Student and parent cannot use this api.
 */
export async function PATCH(
    req: NextRequest,
    {params}: {params: {teacherId: string}}
): Promise<
    NextResponse<
        | AdminPatchResponsePayload
        | TeacherPatchResponsePayload
        | ErrorResponsePayload
    >
> {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("PATCH ", req.nextUrl.pathname);

    const role: UserRole | null = getClerkRole();
    let result: AdminPatchResponsePayload | TeacherPatchResponsePayload;
    try {
        switch (role) {
            case UserRole.ADMIN:
                result = await adminPatchHandler(params.teacherId, req);
                break;
            case UserRole.TEACHER:
                result = await teacherPatchHandler(params.teacherId, req);
                break;
            default:
                throw new ApiError(400, "No right permission");
        }
        return NextResponse.json<
            AdminPatchResponsePayload | TeacherPatchResponsePayload
        >(result, {status: 200});
    } catch (error) {
        return buildErrorNextResponse(error);
    }
}

/**
 * Delete teacher account.
 * Admin and teacher with right ID can access this api.
 */
export async function DELETE(
    req: NextRequest,
    {params}: {params: {teacherId: string}}
): Promise<
    NextResponse<
        | AdminDeleteResponsePayload
        | TeacherDeleteResponsePayload
        | ErrorResponsePayload
    >
> {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("DELETE ", req.nextUrl.pathname);

    const role: UserRole | null = getClerkRole();
    let result: AdminDeleteResponsePayload | TeacherDeleteResponsePayload;
    try {
        switch (role) {
            case UserRole.ADMIN:
                result = await adminDeleteHandler(params.teacherId, req);
                break;
            case UserRole.TEACHER:
                result = await teacherDeleteHandler(params.teacherId);
                break;
            default:
                throw new ApiError(400, "No right permission");
        }
        return NextResponse.json<
            AdminDeleteResponsePayload | TeacherDeleteResponsePayload
        >(result, {status: 200});
    } catch (error) {
        return buildErrorNextResponse(error);
    }
}
