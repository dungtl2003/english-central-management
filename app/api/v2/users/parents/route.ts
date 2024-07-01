export const dynamic = "force-dynamic";

import {buildErrorNextResponse, getClerkRole} from "@/lib/helper";
import {auth} from "@clerk/nextjs/server";
import {ApiError} from "next/dist/server/api-utils";
import {NextRequest, NextResponse} from "next/server";
import {
    GetResponsePayload,
    PostRequestPayload,
    PostResponsePayload,
} from "./types";
import {ErrorResponsePayload, UserRole} from "@/constaints";
import {PostRequestPayloadSchema} from "./schema";
import {addParent} from "./helper";
import {db} from "@/lib/db";

/**
 * Get students.
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

        const parents = await db.parent.findMany({
            include: {
                user: true,
                children: true,
            },
        });

        const result: GetResponsePayload = parents.map((s) => {
            return {
                ...s,
                numberOfChildren: s.children.length,
            };
        });

        return NextResponse.json<GetResponsePayload>(result, {status: 200});
    } catch (error) {
        return buildErrorNextResponse(error);
    }
}

/**
 * Add parent.
 * Only user who chose parent role can use this api.
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
                {error: "Cannot create parent with different ID"},
                {status: 400}
            );
        }

        await addParent(clerkUserId);
        return NextResponse.json<PostResponsePayload>("Added parent", {
            status: 200,
        });
    } catch (error) {
        return buildErrorNextResponse(error);
    }
}