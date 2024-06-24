import {auth, clerkClient} from "@clerk/nextjs/server";
import {ApiError} from "next/dist/server/api-utils";
import {NextRequest, NextResponse} from "next/server";
import {PostRequestPayload, PostResponsePayload} from "./types";
import {buildErrorNextResponse} from "@/lib/helper";

export async function POST(
    req: NextRequest,
    {params}: {params: {clerkUserId: string}}
): Promise<NextResponse> {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("POST ", req.nextUrl.pathname);

    const clerkUserId = auth().userId;

    try {
        if (!clerkUserId) {
            throw new ApiError(401, "No signed in user");
        }
        if (clerkUserId !== params.clerkUserId) {
            throw new ApiError(401, "No right permission");
        }

        const unsafeMetadata: PostRequestPayload = await req.json();
        await clerkClient.users.updateUser(clerkUserId, {
            unsafeMetadata: unsafeMetadata,
        });

        return NextResponse.json<PostResponsePayload>(
            "Updated profile on clerk",
            {
                status: 200,
            }
        );
    } catch (error) {
        return buildErrorNextResponse(error);
    }
}
