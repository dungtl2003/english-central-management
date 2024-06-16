import {db} from "@/lib/db";
import {NextRequest, NextResponse} from "next/server";
import {PostRegister, PostRegisterSchema} from "../../schema";

/**
 * Let student registers this class.
 * Only student can access this api.
 */
export async function POST(
    req: NextRequest,
    {params}: {params: {classId: string}}
) {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("POST ", req.nextUrl.pathname);

    let student;
    //try {
    //    await authHandler();
    //
    //    const clerkUserId = auth().userId;
    //    const role: UserRole | null = getClerkRole();
    //
    //    if (!role || role !== UserRole.STUDENT) {
    //        throw Error("No right permission");
    //    }
    //
    //    student = await db.user.findFirst({
    //        where: {
    //            referId: clerkUserId!,
    //            role: "STUDENT",
    //        },
    //        select: {
    //            student: {
    //                select: {
    //                    id: true,
    //                },
    //            },
    //        },
    //    });
    //
    //    if (!student) {
    //        throw new Error(
    //            `No student with refer ID ${clerkUserId} found in database`
    //        );
    //    }
    //} catch (error) {
    //    console.log("Error: ", (<Error>error).message);
    //    return new NextResponse((<Error>error).message, {status: 401});
    //}

    const body: PostRegister = await req.json();
    const result = PostRegisterSchema.safeParse(body);
    if (result.error) {
        console.log("Error: ", result.error.flatten());
        return NextResponse.json({error: "Wrong body format"}, {status: 400});
    }

    try {
        let studentInClass = await db.studentsInClasses.findFirst({
            where: {
                studentId: student!.student!.id,
                classId: params.classId,
            },
        });

        if (studentInClass) {
            throw new Error("This student has already registered once");
        }

        studentInClass = await db.studentsInClasses.create({
            data: {
                classId: params.classId,
                studentId: student!.student!.id,
            },
        });

        return NextResponse.json(studentInClass, {status: 200});
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return NextResponse.json(
            {error: "Failed to register the student"},
            {status: 500}
        );
    }
}
