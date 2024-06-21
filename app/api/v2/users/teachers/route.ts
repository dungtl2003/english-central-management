import {NextRequest, NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import {addTeacher, adminGetHandler, teacherGetHandler} from "./helper";
import {ApiError} from "next/dist/server/api-utils";
import {
    AdminGetResponsePayload,
    PostRequestPayload,
    PostResponsePayload,
    TeacherGetResponsePayload,
} from "./types";
import {PostRequestPayloadSchema} from "./schema";
import {
    buildErrorNextResponse,
    convertQueryParamsToJsonObject,
    getClerkRole,
} from "@/lib/helper";
import {ErrorResponsePayload, Json, UserRole} from "@/constaints";

/**
 * Get teachers.
 * Admin can get all teachers.
 * Teacher can only get teacher accounts that he/she owns.
 */
export async function GET(
    req: NextRequest
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
        const jsonObj: Json = convertQueryParamsToJsonObject(
            req.nextUrl.searchParams
        );
        switch (role) {
            case UserRole.ADMIN:
                result = await adminGetHandler();
                break;
            case UserRole.TEACHER:
                result = await teacherGetHandler(jsonObj);
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
 * Add teacher.
 * Only user who chose teacher role can use this api.
 */
export async function POST(
    req: NextRequest
): Promise<NextResponse<PostResponsePayload | ErrorResponsePayload>> {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("POST ", req.nextUrl.pathname);

    try {
        const clerkUserId = auth().userId;
        if (!clerkUserId) {
            throw new ApiError(401, "No signed in user");
        }
        const body: PostRequestPayload = await req.json();
        const validBody = PostRequestPayloadSchema.safeParse(body);
        if (validBody.error) {
            throw new ApiError(
                400,
                JSON.stringify(validBody.error.flatten().fieldErrors)
            );
        }

        if (clerkUserId !== validBody.data.id) {
            return NextResponse.json(
                {error: "Cannot create teacher with different ID"},
                {status: 400}
            );
        }

        await addTeacher(clerkUserId);
        return NextResponse.json<PostResponsePayload>("Added teacher", {
            status: 200,
        });
    } catch (error) {
        return buildErrorNextResponse(error);
    }
}
