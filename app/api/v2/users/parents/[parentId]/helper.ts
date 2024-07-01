import {auth} from "@clerk/nextjs/server";
import {ParentGetResponsePayload} from "./types";
import {UserRole} from "@prisma/client";
import {getClerkRole} from "@/lib/helper";
import {ApiError} from "next/dist/server/api-utils";
import {db} from "@/lib/db";

export async function parentGetHandler(
    parentId: string
): Promise<ParentGetResponsePayload> {
    const clerkUserId = auth().userId;
    const role: UserRole | null = getClerkRole();

    if (!clerkUserId) {
        throw new ApiError(401, "No signed in user");
    }

    if (!role || role !== UserRole.PARENT) {
        throw new ApiError(401, "No right permission");
    }

    const user = await db.user.findFirst({
        where: {
            referId: clerkUserId,
            role: UserRole.PARENT,
        },
    });

    if (!user) {
        throw new ApiError(401, `Account not found`);
    }

    const parent = await db.parent.findFirst({
        where: {
            id: parentId,
        },
        include: {
            user: true,
        },
    });

    if (!parent) {
        throw new ApiError(400, "Parent not found");
    }

    if (parent.user.referId !== clerkUserId) {
        throw new ApiError(401, "No right permission");
    }

    return parent;
}
