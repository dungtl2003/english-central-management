import {db} from "@/lib/db";
import {authHandler, getClerkRole} from "@/lib/helper";
import {auth} from "@clerk/nextjs/server";
import {Prisma, UserRole} from "@prisma/client";
import {NextRequest, NextResponse} from "next/server";
import {PostApprove, PostApproveSchema} from "../../schema";

/**
 * Approve the student who wants to join this class.
 * Only admin can access this api.
 */
export async function POST(
    req: NextRequest,
    {params}: {params: {classId: string}}
) {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("POST ", req.nextUrl.pathname);

    try {
        await authHandler();

        const clerkUserId = auth().userId;
        const role: UserRole | null = getClerkRole();

        if (!role || role !== UserRole.ADMIN) {
            throw Error("No right permission");
        }

        const admin = await db.user.findFirst({
            where: {
                referId: clerkUserId!,
                role: "ADMIN",
            },
        });

        if (!admin) {
            throw new Error(
                `No admin with refer ID ${clerkUserId} found in database`
            );
        }
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return new NextResponse((<Error>error).message, {status: 401});
    }

    const body: PostApprove = await req.json();
    const result = PostApproveSchema.safeParse(body);
    if (result.error) {
        console.log("Error: ", result.error.flatten());
        return NextResponse.json({error: "Wrong body format"}, {status: 400});
    }

    try {
        const student = await db.user.findFirst({
            where: {
                referId: result.data!.studentId,
                role: "STUDENT",
            },
            select: {
                student: {
                    select: {
                        id: true,
                    },
                },
            },
        });

        const studentInClass = await db.studentsInClasses.findFirst({
            where: {
                studentId: student!.student!.id,
                classId: params.classId,
            },
            include: {
                class: true,
            },
        });

        if (!studentInClass) {
            throw new Error(
                "Can't find request wanting to join the class of this student in database"
            );
        }

        if (studentInClass.approvedAt) {
            throw new Error(
                "This student has already been approved to this class once"
            );
        }

        if (studentInClass.class.closedAt) {
            throw new Error("This class has already closed");
        }

        await db.studentsInClasses.update({
            where: {
                classId_studentId: {
                    studentId: studentInClass.studentId,
                    classId: studentInClass.classId,
                } as Prisma.StudentsInClassesClassIdStudentIdCompoundUniqueInput,
            },
            data: {
                approvedAt: new Date(),
            },
        });

        return NextResponse.json("ok", {status: 200});
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return NextResponse.json(
            {error: "Failed to approve the student"},
            {status: 500}
        );
    }
}
