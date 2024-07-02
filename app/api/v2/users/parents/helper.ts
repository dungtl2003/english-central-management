import {db} from "@/lib/db";
import {getClerkRole} from "@/lib/helper";
import {auth, clerkClient} from "@clerk/nextjs/server";
import {UserRole} from "@prisma/client";
import {ApiError} from "next/dist/server/api-utils";
import {AdminGetResponsePayload, ParentGetResponsePayload} from "./types";

export async function parentGetHandler(): Promise<ParentGetResponsePayload> {
    const clerkUserId = auth().userId;
    const role: UserRole | null = getClerkRole();

    if (!clerkUserId) {
        throw new ApiError(401, "No signed in user");
    }

    if (!role || role !== UserRole.PARENT) {
        throw new ApiError(401, "No right permission");
    }

    const parent = await db.user.findFirst({
        where: {
            referId: clerkUserId,
            role: UserRole.PARENT,
        },
        include: {
            parent: true,
        },
    });

    if (!parent) {
        throw new ApiError(401, `Account not found`);
    }

    return parent;
}

export async function adminGetHandler(): Promise<AdminGetResponsePayload> {
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

    const result: AdminGetResponsePayload = parents.map((s) => {
        return {
            ...s,
            numberOfChildren: s.children.length,
        };
    });

    return result;
}

export function addParent(clerkUserId: string) {
    return db.$transaction(async () => {
        await db.user.update({
            where: {
                referId: clerkUserId,
            },
            data: {
                role: UserRole.PARENT,
                parent: {
                    create: {},
                },
            },
        });

        await clerkClient.users.updateUser(clerkUserId, {
            publicMetadata: {
                role: UserRole.PARENT,
            },
        });
    });
}
