import {auth} from "@clerk/nextjs/server";
import {AdminGetResponsePayload, ParentGetResponsePayload} from "./types";
import {UserRole} from "@prisma/client";
import {getClerkRole} from "@/lib/helper";
import {ApiError} from "next/dist/server/api-utils";
import {db} from "@/lib/db";

export async function adminGetHandler(
    parentId: string
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

    const parent = await db.parent.findFirst({
        where: {
            id: parentId,
        },
        include: {
            user: true,
            children: {
                include: {
                    child: {
                        include: {
                            user: true,
                            tuitions: true,
                        },
                    },
                },
            },
        },
    });

    if (!parent) {
        throw new ApiError(400, "Parent not found");
    }

    const result: AdminGetResponsePayload = {
        ...parent,
        children: parent.children.map((c) => c.child),
    };

    return result;
}

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
