import {db} from "@/lib/db";
import {NextRequest, NextResponse} from "next/server";
import {clerkClient} from "@clerk/nextjs/server";
import {getClerkRole} from "@/lib/helper";
import {
    Class,
    MonthlyPayment,
    Teacher,
    Unit,
    User,
    UserRole,
} from "@prisma/client";
import {BasePatch, BasePatchSchema} from "./schema";

/**
 * Get teacher's detail information.
 * Teacher can use this api (with him/her's ID).
 * Admin can use this api with teacher's ID
 */
export async function GET(
    req: NextRequest,
    {params}: {params: {teacherId: string}}
) {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("GET ", req.nextUrl.pathname);

    //try {
    //    await authHandler();
    //} catch (error) {
    //    console.log("Error: ", (<Error>error).message);
    //    return NextResponse.json({error: error}, {status: 401});
    //}

    const teacherId = params.teacherId;
    const role: UserRole | null = getClerkRole();

    if (!role || role !== UserRole.ADMIN) {
        return NextResponse.json({error: "No right permission"}, {status: 401});
    }

    try {
        const teacher: QueryWithAdminRoleType = (await queryWithAdminRole(
            teacherId
        )) as QueryWithAdminRoleType;

        if (!teacher) {
            throw new Error(
                `No teacher with ID ${teacherId} found in database`
            );
        }

        console.log("Got teacher: ", teacher);
        return NextResponse.json(teacher, {status: 200});
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return NextResponse.json(
            {error: "Failed to get teacher"},
            {status: 500}
        );
    }
}

type QueryWithAdminRoleType = Teacher & {
    user: User;
    classes: (Class & {
        unit: Unit;
    })[];
    monthlyPayments: MonthlyPayment[];
};
const queryWithAdminRole = async (
    teacherId: string
): Promise<QueryWithAdminRoleType | null> => {
    const teacher = await db.teacher.findFirst({
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
    return teacher;
};

/**
 * Update teacher's information.
 * Teacher can update everything EXCEPT base salary.
 * Admin can update teacher's status and base salary only.
 * Student and parent cannot use this api.
 */
export async function PATCH(
    req: NextRequest,
    {params}: {params: {teacherId: string}}
) {
    // console.log("Timestamp: ", new Date().toLocaleString());
    // console.log("PATCH ", req.nextUrl.pathname);

    // try {
    //     await authHandler();
    // } catch (error) {
    //     console.log("Error: ", (<Error>error).message);
    //     return NextResponse.json({ error: error }, { status: 401 });
    // }

    // const role: UserRole | null = getClerkRole();

    // if (
    //     !role ||
    //     (role !== UserRole.ADMIN)
    // ) {
    //     return NextResponse.json({ error: "No right permission" }, { status: 401 });
    // }

    const teacherId = params.teacherId;
    const body: BasePatch = await req.json();
    const result = BasePatchSchema.safeParse(body);
    if (result.error) {
        console.log("Error: ", result.error.flatten());
        return NextResponse.json({error: "Wrong body format"}, {status: 400});
    }

    try {
        const teacher = await db.teacher.update({
            where: {
                id: teacherId,
            },
            data: {
                baseSalary: body.baseSalary,
                monthlyPayments: {
                    createMany: {
                        data: body.monthlyPayments || [],
                    },
                },
                status: body.status,
                acceptedAt: body.acceptedAt,
                user: {
                    update: {
                        deletedAt: body.deletedAt,
                    },
                },
            },
            include: {
                user: true,
                monthlyPayments: true,
            },
        });

        const clerkTeacherID = await db.user
            .findFirst({
                where: {
                    teacher: {
                        id: teacherId,
                    },
                },
                include: {
                    teacher: true,
                },
            })
            .then((v) => v?.referId);

        if (body.status === "DELETED" || body.status === "REJECTED") {
            await clerkClient.users.deleteUser(clerkTeacherID as string);
        }

        return NextResponse.json(teacher, {status: 200});
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return NextResponse.json(
            {error: "Failed to patch teacher"},
            {status: 500}
        );
    }
}
