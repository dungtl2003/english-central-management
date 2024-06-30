import {db} from "@/lib/db";
import {getClerkRole} from "@/lib/helper";
import {auth, clerkClient} from "@clerk/nextjs/server";
import {TeacherStatus, UserRole} from "@prisma/client";
import {ApiError} from "next/dist/server/api-utils";
import {
    AdminDeleteRequestPayload,
    AdminGetResponsePayload,
    AdminPatchRequestPayload,
    TeacherGetResponsePayload,
    TeacherPatchResponsePayload,
} from "./types";
import {NextRequest} from "next/server";
import {
    AdminDeleteRequestPayloadSchema,
    AdminPatchRequestPayloadSchema,
    TeacherPatchRequestPayloadSchema,
} from "./schema";

export async function teacherGetHandler(
    teacherId: string
): Promise<TeacherGetResponsePayload> {
    const clerkUserId = auth().userId;
    const role: UserRole | null = getClerkRole();

    if (!clerkUserId) {
        throw new ApiError(401, "No signed in user");
    }

    if (!role || role !== UserRole.TEACHER) {
        throw new ApiError(401, "No right permission");
    }

    const user = await db.user.findFirst({
        where: {
            referId: clerkUserId,
            role: UserRole.TEACHER,
        },
    });

    if (!user) {
        throw new ApiError(401, `Account not found`);
    }

    const teacher: TeacherGetResponsePayload = await db.teacher.findFirst({
        where: {
            id: teacherId,
        },
        include: {
            user: true,
        },
    });

    if (!teacher) {
        throw new ApiError(400, "Teacher not found");
    }

    if (teacher.user.referId !== clerkUserId) {
        throw new ApiError(401, "No right permission");
    }

    return teacher;
}

export async function adminGetHandler(
    teacherId: string
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

    const teacher: AdminGetResponsePayload = await db.teacher.findFirst({
        where: {
            id: teacherId,
        },
        include: {
            user: true,
            classes: {
                include: {
                    unit: true,
                },
            },
            monthlyPayments: true,
        },
    });

    if (!teacher) {
        throw new ApiError(400, "Teacher not found");
    }

    return teacher;
}

export async function teacherPatchHandler(
    teacherId: string,
    request: NextRequest
): Promise<TeacherPatchResponsePayload> {
    const clerkUserId = auth().userId;
    const role: UserRole | null = getClerkRole();

    if (!clerkUserId) {
        throw new ApiError(401, "No signed in user");
    }

    if (!role || role !== UserRole.TEACHER) {
        throw new ApiError(401, "No right permission");
    }

    const user = await db.user.findFirst({
        where: {
            referId: clerkUserId,
            role: UserRole.TEACHER,
            teacher: {
                id: teacherId,
            },
        },
    });

    if (!user) {
        throw new ApiError(401, `Account not found`);
    }

    const body: TeacherPatchResponsePayload = await request.json();
    const result = TeacherPatchRequestPayloadSchema.safeParse(body);
    if (result.error) {
        throw new ApiError(
            400,
            JSON.stringify(result.error.flatten().fieldErrors)
        );
    }

    await db.user.update({
        where: {
            id: user.id,
        },
        data: {
            firstName: result.data.firstName,
            lastName: result.data.lastName,
            phoneNumber: result.data.phoneNumber,
            identifyCard: result.data.identifyCard,
            imageUrl: result.data.imageUrl,
        },
    });

    return "Updated teacher";
}

export async function adminPatchHandler(
    teacherId: string,
    request: NextRequest
): Promise<TeacherPatchResponsePayload> {
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

    const body: AdminPatchRequestPayload = await request.json();
    const result = AdminPatchRequestPayloadSchema.safeParse(body);
    if (result.error) {
        throw new ApiError(
            400,
            JSON.stringify(result.error.flatten().fieldErrors)
        );
    }

    await db.teacher.update({
        where: {
            id: teacherId,
        },
        data: {
            baseSalary: result.data.baseSalary,
            status: result.data.status,
            acceptedAt: result.data.acceptedAt,
        },
    });

    return "Updated teacher";
}

export async function teacherDeleteHandler(
    teacherId: string
): Promise<TeacherPatchResponsePayload> {
    const clerkUserId = auth().userId;
    const role: UserRole | null = getClerkRole();

    if (!clerkUserId) {
        throw new ApiError(401, "No signed in user");
    }

    if (!role || role !== UserRole.TEACHER) {
        throw new ApiError(401, "No right permission");
    }

    const user = await db.user.findFirst({
        where: {
            teacher: {
                id: teacherId,
            },
            referId: clerkUserId,
            role: UserRole.TEACHER,
        },
    });

    if (!user) {
        throw new ApiError(401, `Account not found`);
    }

    if (user.deletedAt) {
        throw new ApiError(400, "This teacher has already been deleted");
    }

    await db.$transaction(async () => {
        await db.user.update({
            where: {
                id: user.id,
            },
            data: {
                teacher: {
                    update: {
                        status: TeacherStatus.DELETED,
                    },
                },
                deletedAt: new Date(),
            },
        });
        await clerkClient.users.deleteUser(clerkUserId);
    });

    return "Deleted teacher";
}

export async function adminDeleteHandler(
    teacherId: string,
    request: NextRequest
): Promise<TeacherPatchResponsePayload> {
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

    const body: AdminDeleteRequestPayload = await request.json();
    const result = AdminDeleteRequestPayloadSchema.safeParse(body);
    if (result.error) {
        throw new ApiError(
            400,
            JSON.stringify(result.error.flatten().fieldErrors)
        );
    }

    const teacher = await db.teacher.findFirst({
        where: {
            id: teacherId,
        },
        include: {
            user: true,
        },
    });

    if (!teacher) {
        throw new ApiError(400, "Teacher not found");
    }

    if (teacher.user.deletedAt) {
        throw new ApiError(400, "This teacher has already been deleted");
    }

    await db.$transaction(async () => {
        await db.teacher.update({
            where: {
                id: teacherId,
            },
            data: {
                status: result.data.status,
                user: {
                    update: {
                        deletedAt: new Date(),
                    },
                },
            },
        });
        teacher.user.referId &&
            (await clerkClient.users.deleteUser(teacher.user.referId));
    });

    return "Deleted teacher";
}
