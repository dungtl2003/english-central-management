import {NextRequest, NextResponse} from "next/server";
import {authPayHandler} from "./helper";

/**
 * Perform student's payments.
 * Only teacher with right teacher ID, student ID, class ID can perform this api.
 */
export async function POST(
    req: NextRequest,
    {
        params,
    }: {params: {referTeacherId: string; classId: string; studentId: string}}
) {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("POST ", req.nextUrl.pathname);

    try {
        await authPayHandler(
            params.referTeacherId,
            params.classId,
            params.studentId
        );
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return NextResponse.json({error: error}, {status: 401});
    }

    //const body: BasePatch = await req.json();
    //const result = getPatchSchemaByRole(role).safeParse(body);
    //if (result.error) {
    //    console.log("Error: ", result.error.flatten());
    //    return NextResponse.json({error: "Wrong body format"}, {status: 400});
    //}
    //
    //try {
    //    const teacher = await db.user.update({
    //        where: {
    //            referId: teacherId,
    //        },
    //        data: {
    //            firstName: body.firstName,
    //            lastName: body.lastName,
    //            phoneNumber: body.phoneNumber,
    //            identifyCard: body.identifyCard,
    //            imageUrl: body.imageUrl,
    //            teacher: {
    //                update: {
    //                    baseSalary: body.baseSalary,
    //                },
    //            },
    //        },
    //        include: {
    //            teacher: true,
    //        },
    //    });
    //
    //    return NextResponse.json(teacher, {status: 200});
    //} catch (error) {
    //    console.log("Error: ", (<Error>error).message);
    //    return NextResponse.json(
    //        {error: "Failed to get teacher"},
    //        {status: 500}
    //    );
    //}
    return NextResponse.json("ok", {status: 200});
}
