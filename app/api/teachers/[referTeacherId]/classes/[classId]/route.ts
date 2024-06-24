import {db} from "@/lib/db";
import {NextRequest, NextResponse} from "next/server";
import {authGetHandler} from "./helper";

/**
 * Get class's detail information.
 * Only teacher with right ID can access this api.
 */
export async function GET(
    req: NextRequest,
    {params}: {params: {referTeacherId: string; classId: string}}
) {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("GET ", req.nextUrl.pathname);

    let teacherId;
    try {
        teacherId = await authGetHandler(params.referTeacherId);
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return NextResponse.json({error: error}, {status: 401});
    }

    try {
        const _class = await db.class.findFirst({
            where: {
                id: params.classId,
                teacherId: teacherId,
            },
            include: {
                unit: true,
                sessions: {
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
                },
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
                                        classId: params.classId,
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
                                    include: {
                                        session: true,
                                    },
                                    where: {
                                        session: {
                                            classId: params.classId,
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

        return NextResponse.json(_class, {status: 200});
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return NextResponse.json({error: "Failed to get class"}, {status: 500});
    }
}
