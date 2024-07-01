import {getClerkRole} from "@/lib/helper";
import {auth} from "@clerk/nextjs/server";
import {UserRole} from "@prisma/client";
import {AdminGetResponsePayload, StudentGetResponsePayload} from "./types";
import {ApiError} from "next/dist/server/api-utils";
import {db} from "@/lib/db";

export async function adminGetHandler(
    studentId: string
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

    const student = await db.student.findFirst({
        where: {
            id: studentId,
        },
        include: {
            user: true,
        },
    });

    if (!student) {
        throw new ApiError(400, `No student with ID ${studentId} found`);
    }

    const [parents, classes] = await Promise.all([
        db.childrenParents.findMany({
            where: {
                childId: studentId,
            },
            include: {
                parent: {
                    include: {
                        user: true,
                    },
                },
            },
        }),
        db.studentsInClasses.findMany({
            where: {
                studentId: studentId,
            },
            include: {
                class: {
                    include: {
                        unit: true,
                        students: {
                            where: {
                                NOT: {
                                    approvedAt: null,
                                },
                                leftAt: null,
                            },
                        },
                        sessions: {
                            where: {
                                attendances: {
                                    some: {
                                        studentId: studentId,
                                    },
                                },
                            },
                            include: {
                                attendances: {
                                    where: {
                                        studentId: studentId,
                                    },
                                },
                            },
                        },
                        tuitions: {
                            where: {
                                childId: studentId,
                            },
                        },
                    },
                },
            },
        }),
    ]);

    const result: AdminGetResponsePayload = {
        ...student,
        parents: parents.map((p) => p.parent),
        classes: classes.map((c) => {
            return {
                ...c.class,
                approvedAt: c.approvedAt,
                rejectedAt: c.rejectedAt,
                leftAt: c.leftAt,
            };
        }),
    };

    return result;
}

export async function studentGetHandler(
    studentId: string
): Promise<StudentGetResponsePayload> {
    const clerkUserId = auth().userId;
    const role: UserRole | null = getClerkRole();

    if (!clerkUserId) {
        throw new ApiError(401, "No signed in user");
    }

    if (!role || role !== UserRole.STUDENT) {
        throw new ApiError(401, "No right permission");
    }

    const user = await db.user.findFirst({
        where: {
            referId: clerkUserId,
            role: UserRole.STUDENT,
        },
    });

    if (!user) {
        throw new ApiError(401, `Account not found`);
    }

    const student = await db.student.findFirst({
        where: {
            id: studentId,
        },
        include: {
            user: true,
        },
    });

    if (!student) {
        throw new ApiError(400, "Student not found");
    }

    if (student.user.referId !== clerkUserId) {
        throw new ApiError(401, "No right permission");
    }

    return student as StudentGetResponsePayload;
}
