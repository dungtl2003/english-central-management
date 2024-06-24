import {db} from "@/lib/db";
import {NextRequest, NextResponse} from "next/server";
import {UserRole} from "@prisma/client";
import {authGetHandler, authPatchHandler} from "./helper";
import {BasePatch, getPatchSchemaByRole} from "./schema";
import {getClerkRole} from "@/lib/helper";

/**
 * Get teacher's detail information.
 * Only teacher can use this api (with him/her's ID).
 */
export async function GET(
    req: NextRequest,
    {params}: {params: {referTeacherId: string}}
) {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("GET ", req.nextUrl.pathname);

    try {
        await authGetHandler(params.referTeacherId);
    } catch (error) {
        console.error("Error: ", (<Error>error).message);
        return NextResponse.json({error: error}, {status: 401});
    }

    try {
        const teacher = await db.user.findFirst({
            where: {
                referId: params.referTeacherId,
            },
            include: {
                teacher: true,
            },
        });

        return NextResponse.json(teacher, {status: 200});
    } catch (error) {
        console.error("Error: ", (<Error>error).message);
        return NextResponse.json(
            {error: "Failed to get teacher"},
            {status: 500}
        );
    }
}

/**
 * Update teacher's information.
 * Teacher can update everything EXCEPT base salary.
 * Admin can update teacher's status and base salary only.
 * Student and parent cannot use this api.
 */
export async function PATCH(
    req: NextRequest,
    {params}: {params: {referTeacherId: string}}
) {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("PATCH ", req.nextUrl.pathname);

    try {
        await authPatchHandler(params.referTeacherId);
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return NextResponse.json({error: error}, {status: 401});
    }

    const role: UserRole | null = getClerkRole();
    const body: BasePatch = await req.json();
    const result = getPatchSchemaByRole(role!).safeParse(body);
    if (result.error) {
        console.log("Error: ", result.error.flatten());
        return NextResponse.json({error: "Wrong body format"}, {status: 400});
    }

    try {
        const teacher = await db.user.update({
            where: {
                referId: params.referTeacherId,
            },
            data: {
                firstName: body.firstName,
                lastName: body.lastName,
                phoneNumber: body.phoneNumber,
                identifyCard: body.identifyCard,
                imageUrl: body.imageUrl,
                teacher: {
                    update: {
                        baseSalary: body.baseSalary,
                    },
                },
            },
            include: {
                teacher: true,
            },
        });

        return NextResponse.json(teacher, {status: 200});
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return NextResponse.json(
            {error: "Failed to get teacher"},
            {status: 500}
        );
    }
}
