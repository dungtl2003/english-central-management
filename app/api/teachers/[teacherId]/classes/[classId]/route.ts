import {db} from "@/lib/db";
import {authHandler, getClerkRole} from "@/lib/helper";
import {auth} from "@clerk/nextjs/server";
import {UserRole} from "@prisma/client";
import {NextRequest, NextResponse} from "next/server";

/**
 * Get class's detail information.
 * Only teacher with right ID can access this api.
 */
export async function GET(
    req: NextRequest,
    {params}: {params: {teacherId: string; classId: string}}
) {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("GET ", req.nextUrl.pathname);

    try {
        await authHandler();
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return NextResponse.json({error: error}, {status: 401});
    }

    const clerkUserId = auth().userId;
    const teacherId = params.teacherId;
    const classId = params.classId;
    const role: UserRole | null = getClerkRole();

    if (
        !role ||
        role !== UserRole.TEACHER ||
        (role === UserRole.TEACHER && clerkUserId !== teacherId)
    ) {
        return NextResponse.json({error: "No right permission"}, {status: 401});
    }

    try {
        const user = await db.user.findFirst({
            where: {
                referId: teacherId,
            },
            select: {
                teacher: {
                    select: {
                        id: true,
                    },
                },
            },
        });
        const _class = await db.class.findFirst({
            where: {
                id: classId,
                teacherId: user!.teacher!.id,
            },
            include: {
                unit: true,
                sessions: true,
                students: {
                    where: {
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
                                        classId: classId,
                                    },
                                },
                                attendances: {
                                    where: {
                                        session: {
                                            classId: classId,
                                            attendedTime: {
                                                not: null,
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        console.log("Got class: ", _class);
        return NextResponse.json(_class, {status: 200});
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return NextResponse.json({error: "Failed to get class"}, {status: 500});
    }
}
