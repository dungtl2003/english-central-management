export const dynamic = "force-dynamic";

import {NextRequest, NextResponse} from "next/server";
import {
    AdminGetResponsePayload,
    PostRequestPayload,
    PostResponsePayload,
    StudentGetResponsePayload,
} from "./types";
import {ErrorResponsePayload, UserRole} from "@/constaints";
import {buildErrorNextResponse, getClerkRole} from "@/lib/helper";
import {auth} from "@clerk/nextjs/server";
import {ApiError} from "next/dist/server/api-utils";
import {PostRequestPayloadSchema} from "./schema";
import {addStudent, adminGetHandler, studentGetHandler} from "./helper";

/**
 * Get students.
 * Admin can access this api.
 * Student with right ID can access this api, only get by refer ID.
 */
export async function GET(
    req: NextRequest
): Promise<
    NextResponse<
        | AdminGetResponsePayload
        | StudentGetResponsePayload
        | ErrorResponsePayload
    >
> {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("GET ", req.nextUrl.pathname);

    const role: UserRole | null = getClerkRole();
    let result: AdminGetResponsePayload | StudentGetResponsePayload;
    try {
        switch (role) {
            case UserRole.ADMIN:
                result = await adminGetHandler();
                break;
            case UserRole.STUDENT:
                result = await studentGetHandler();
                break;
            default:
                throw new ApiError(400, "No right permission");
        }

        return NextResponse.json<
            AdminGetResponsePayload | StudentGetResponsePayload
        >(result, {status: 200});
    } catch (error) {
        return buildErrorNextResponse(error);
    }
}

/**
 * Add student.
 * Only user who chose student role can use this api.
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
                {error: "Cannot create student with different ID"},
                {status: 400}
            );
        }

        await addStudent(clerkUserId);
        return NextResponse.json<PostResponsePayload>("Added student", {
            status: 200,
        });
    } catch (error) {
        return buildErrorNextResponse(error);
    }
}
