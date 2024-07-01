import {buildErrorNextResponse, getClerkRole} from "@/lib/helper";
import {UserRole} from "@prisma/client";
import {ApiError} from "next/dist/server/api-utils";
import {NextRequest, NextResponse} from "next/server";
import {AdminGetResponsePayload, ParentGetResponsePayload} from "./types";
import {ErrorResponsePayload} from "@/constaints";
import {adminGetHandler, parentGetHandler} from "./helper";

/**
 * Get parent's detail.
 * Admin can access this api.
 * Parent with right ID can access this api.
 */
export async function GET(
    req: NextRequest,
    {params}: {params: {parentId: string}}
): Promise<
    NextResponse<
        | AdminGetResponsePayload
        | ParentGetResponsePayload
        | ErrorResponsePayload
    >
> {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("GET ", req.nextUrl.pathname);

    const role: UserRole | null = getClerkRole();
    let result: AdminGetResponsePayload | ParentGetResponsePayload;
    try {
        switch (role) {
            case UserRole.ADMIN:
                result = await adminGetHandler(params.parentId);
                break;
            case UserRole.PARENT:
                result = await parentGetHandler(params.parentId);
                break;
            default:
                throw new ApiError(400, "No right permission");
        }
        return NextResponse.json<
            AdminGetResponsePayload | ParentGetResponsePayload
        >(result, {status: 200});
    } catch (error) {
        return buildErrorNextResponse(error);
    }
}
