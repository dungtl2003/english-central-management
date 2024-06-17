import {NextRequest, NextResponse} from "next/server";
import {authPayHandler} from "./helper";
import {Post, PostSchema} from "./schema";
import {db} from "@/lib/db";
import {Prisma} from "@prisma/client";

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

    const body: Post = await req.json();
    const result = PostSchema.safeParse(body);
    if (result.error) {
        console.log("Error: ", result.error.flatten());
        return NextResponse.json({error: "Wrong body format"}, {status: 400});
    }

    const data: Prisma.TuitionCreateManyInput[] = [];
    result.data.payments.forEach((payment) => {
        data.push({
            childId: result.data.studentId,
            parentId: result.data.parentId,
            classId: result.data.classId,
            amount: payment.amount,
            year: payment.year,
            month: payment.month,
            discount: result.data.discount,
        });
    });

    try {
        const tuitions = await db.tuition.createMany({
            data: data,
        });

        return NextResponse.json(tuitions, {status: 200});
    } catch (error) {
        const msg = (<Error>error).message;
        console.error("Error: ", msg);
        return NextResponse.json(
            {error: "Payment process failed"},
            {status: 500}
        );
    }
}
