import {NextRequest, NextResponse} from "next/server";
import {BaseQueryParams} from "./schema";
import {db} from "@/lib/db";
import {Json, UserRole} from "@/constaints";
import {
    authHandler,
    convertQueryParamsToJsonObject,
    getClerkRole,
} from "@/lib/helper";
import {getSchemaByRole} from "./helper";

export async function GET(req: NextRequest) {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("GET ", req.url);

    try {
        await authHandler();
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return new NextResponse((<Error>error).message, {status: 401});
    }
    const role: UserRole | null = getClerkRole();
    if (
        !role ||
        (role !== UserRole.ADMIN &&
            role !== UserRole.TEACHER &&
            role !== UserRole.STUDENT)
    ) {
        return NextResponse.json({error: "No right permission"}, {status: 401});
    }

    const jsonObj: Json = convertQueryParamsToJsonObject(
        req.nextUrl.searchParams
    );

    const queryParams: BaseQueryParams = jsonObj;
    const result = getSchemaByRole(role).safeParse(queryParams);

    if (!result.success) {
        console.log("Error: ", result.error.flatten());
        return NextResponse.json({error: "Wrong query param"}, {status: 400});
    }

    try {
        const classes = await db.class.findMany({
            where: {
                teacherId: queryParams.teacherId,
                students: {
                    some: {
                        studentId: queryParams.studentId,
                    },
                },
            },
            include: {
                unit: true,
                teacher: true,
            },
        });
        return NextResponse.json(classes, {status: 200});
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return NextResponse.json(
            {error: "Failed to get classes"},
            {status: 500}
        );
    }
}
