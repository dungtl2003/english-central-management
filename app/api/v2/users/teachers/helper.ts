import {db} from "@/lib/db";
import {getClerkRole} from "@/lib/helper";
import {auth, clerkClient} from "@clerk/nextjs/server";
import {UserRole} from "@prisma/client";
import {ApiError} from "next/dist/server/api-utils";
import {AdminGetResponsePayload, TeacherGetResponsePayload} from "./types";
import {Json} from "@/constaints";
import {TeacherGetQueryParamsSchema} from "./schema";

export function addTeacher(clerkUserId: string) {
    return db.$transaction(async () => {
        const teacher = await db.user.update({
            where: {
                referId: clerkUserId,
            },
            data: {
                role: UserRole.TEACHER,
                teacher: {
                    create: {},
                },
            },
            include: {
                teacher: true,
            },
        });

        const clerkUser = await clerkClient.users.updateUser(clerkUserId, {
            publicMetadata: {
                role: UserRole.TEACHER,
            },
        });

        return [teacher, clerkUser];
    });
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

    const teachers: AdminGetResponsePayload = await db.teacher.findMany({
        include: {
            user: true,
        },
    });

    return teachers;
}

export async function teacherGetHandler(
    queryParams: Json
): Promise<TeacherGetResponsePayload> {
    const clerkUserId = auth().userId;
    const role: UserRole | null = getClerkRole();

    if (!clerkUserId) {
        throw new ApiError(401, "No signed in user");
    }

    if (!role || role !== UserRole.TEACHER) {
        throw new ApiError(401, "No right permission");
    }

    const teacher = await db.user.findFirst({
        where: {
            referId: clerkUserId,
            role: UserRole.TEACHER,
        },
        include: {
            teacher: true,
        },
    });

    if (!teacher) {
        throw new ApiError(401, `Account not found`);
    }

    const validParams = TeacherGetQueryParamsSchema.safeParse(queryParams);
    if (!validParams.success) {
        throw new ApiError(
            400,
            JSON.stringify(validParams.error.flatten().fieldErrors)
        );
    }

    const teachers: TeacherGetResponsePayload = await db.teacher.findMany({
        where: {
            user: {
                referId: validParams.data.referTeacherId,
            },
        },
        include: {
            user: true,
        },
    });

    teachers.filter((t) => t.user.referId === clerkUserId);
    return teachers;
}
