import {NextRequest, NextResponse} from "next/server";
import {adminGetHandler} from "./helper";
import {UserRole} from "@prisma/client";
import {
    buildErrorNextResponse,
    convertQueryParamsToJsonObject,
    getClerkRole,
} from "@/lib/helper";
import {Json} from "@/constaints";
import {AdminGetResponsePayload} from "./types";
import {ApiError} from "next/dist/server/api-utils";

/**
 * Get classes.
 * Admin gets all classes.
 * Student gets all classes.
 * Parent gets all classes.
 */
export async function GET(req: NextRequest) {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("GET ", req.url);

    try {
        const role: UserRole | null = getClerkRole();
        let result: AdminGetResponsePayload;
        const jsonObj: Json = convertQueryParamsToJsonObject(
            req.nextUrl.searchParams
        );
        switch (role) {
            case UserRole.ADMIN:
                result = await adminGetHandler(jsonObj);
                break;
            default:
                throw new ApiError(400, "No right permission");
        }

        return NextResponse.json<AdminGetResponsePayload>(result, {
            status: 200,
        });
    } catch (error) {
        return buildErrorNextResponse(error);
    }
}
