import {db} from "@/lib/db";
import {auth} from "@clerk/nextjs/server";
import {ApiError} from "next/dist/server/api-utils";
import {AdminGetResponsePayload, TeacherGetResponsePayload} from "./types";
import {UserRole} from "@prisma/client";
import {getClerkRole} from "@/lib/helper";

export async function adminGetHandler(
    classId: string
): Promise<AdminGetResponsePayload> {
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

    const cls = await db.class.findFirst({
        where: {
            id: classId,
        },
    });

    if (!cls) {
        throw new ApiError(
            400,
            `Cannot find class with ID ${classId} in database`
        );
    }

    return cls;
}

export async function teacherGetHandler(
    classId: string
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
        include: {
            teacher: true,
        },
    });

    if (!user || !user.teacher) {
        throw new ApiError(401, `Account not found`);
    }

    const cls = await db.class.findFirst({
        where: {
            id: classId,
        },
    });

    if (!cls) {
        throw new ApiError(
            400,
            `Cannot find class with ID ${classId} in database`
        );
    }
    if (cls.teacherId !== user.teacher.id) {
        throw new ApiError(401, `No right permission`);
    }

    const [unit, sessions, students] = await Promise.all([
        db.unit.findFirst({
            where: {
                id: cls.unitId,
            },
        }),
        db.session.findMany({
            where: {
                classId: cls.id,
            },
            include: {
                attendances: {
                    include: {
                        student: {
                            include: {
                                user: true,
                            },
                        },
                    },
                },
            },
        }),
        db.studentsInClasses.findMany({
            where: {
                classId: cls.id,
                approvedAt: {
                    not: null,
                },
            },
            include: {
                student: {
                    include: {
                        user: true,
                        tuitions: {
                            where: {
                                classId: cls.id,
                            },
                        },
                        parents: {
                            include: {
                                parent: {
                                    include: {
                                        user: true,
                                    },
                                },
                            },
                        },
                        attendances: {
                            where: {
                                session: {
                                    classId: cls.id,
                                    attendedTime: {
                                        not: null,
                                    },
                                },
                            },
                            include: {
                                session: true,
                            },
                        },
                    },
                },
            },
        }),
    ]);

    const result: TeacherGetResponsePayload = {
        ...cls,
        unit: unit!,
        sessions: sessions,
        students: students,
    };

    return result;
}
