import {db} from "@/lib/db";
import {getClerkRole} from "@/lib/helper";
import {auth, clerkClient} from "@clerk/nextjs/server";
import {UserRole} from "@prisma/client";
import {ApiError} from "next/dist/server/api-utils";
import {AdminGetResponsePayload, StudentGetResponsePayload} from "./types";

export async function studentGetHandler(): Promise<StudentGetResponsePayload> {
    const clerkUserId = auth().userId;
    const role: UserRole | null = getClerkRole();

    if (!clerkUserId) {
        throw new ApiError(401, "No signed in user");
    }

    if (!role || role !== UserRole.STUDENT) {
        throw new ApiError(401, "No right permission");
    }

    const student = await db.user.findFirst({
        where: {
            referId: clerkUserId,
            role: UserRole.STUDENT,
        },
        include: {
            student: true,
        },
    });

    if (!student) {
        throw new ApiError(401, `Account not found`);
    }

    return student;
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

    const students = await db.student.findMany({
        include: {
            user: true,
            classes: {
                where: {
                    approvedAt: null,
                    rejectedAt: null,
                },
            },
        },
    });

    const result: AdminGetResponsePayload = students.map((s) => {
        return {
            ...s,
            isRequesting: s.classes.length > 0,
        };
    });

    return result;
}

export function addStudent(clerkUserId: string) {
    return db.$transaction(async () => {
        await db.user.update({
            where: {
                referId: clerkUserId,
            },
            data: {
                role: UserRole.STUDENT,
                student: {
                    create: {},
                },
            },
        });

        try {
            await clerkClient.users.updateUser(clerkUserId, {
                publicMetadata: {
                    role: UserRole.STUDENT,
                },
            });
        } catch (error) {
            console.error("Cannot find clerk user");
        }
    });
}
