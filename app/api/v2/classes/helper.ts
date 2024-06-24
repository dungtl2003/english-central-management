import {db} from "@/lib/db";
import {getClerkRole} from "@/lib/helper";
import {auth} from "@clerk/nextjs/server";
import {UserRole} from "@prisma/client";
import {AdminGetQueryParamsSchema} from "./schema";
import {ApiError} from "next/dist/server/api-utils";
import {Json} from "@/constaints";
import {AdminGetQueryParams, AdminGetResponsePayload} from "./types";

export async function adminGetHandler(
    params: Json
): Promise<AdminGetResponsePayload> {
    const clerkUserId = auth().userId;
    const role: UserRole | null = getClerkRole();

    if (!clerkUserId) {
        throw new ApiError(401, "No signed in user");
    }

    if (!role || role !== UserRole.ADMIN) {
        throw new ApiError(401, "No right permission");
    }

    const user = await db.user.findFirst({
        where: {
            referId: clerkUserId,
            role: UserRole.ADMIN,
        },
    });

    if (!user) {
        throw new ApiError(401, `Account not found`);
    }

    const queryParams: AdminGetQueryParams = params;
    const result = AdminGetQueryParamsSchema.safeParse(queryParams);
    if (!result.success) {
        throw new ApiError(
            400,
            JSON.stringify(result.error.flatten().fieldErrors)
        );
    }
    const classes = await db.class.findMany({
        where: {
            teacherId: queryParams.teacherId,
        },
    });

    return classes;
}
