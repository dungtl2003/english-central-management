import {NextRequest, NextResponse} from "next/server";
import {
    BaseQueryParams,
    QueryParamsWithAdminRoleSchema,
    QueryParamsWithTeacherRoleSchema,
    QueryParamsWithStudentRoleSchema,
} from "./schema";
import {db} from "@/lib/db";
import {Json} from "@/constaints";
import {
    authHandler,
    convertQueryParamsToJsonObject,
    getClerkRole,
} from "@/lib/helper";
import {UserRole} from "@prisma/client";

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
                unit: {
                    grade: queryParams.grade,
                    year: queryParams.year,
                    price_per_session: queryParams.price_per_session,
                },
                students: {
                    some: {
                        studentId: queryParams.studentId,
                    },
                },
                startTime: queryParams.startTime || {
                    gte: queryParams.startPeriod,
                },
                endTime: queryParams.endTime || {
                    lte: queryParams.endPeriod,
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

function getSchemaByRole(role: string) {
    switch (role) {
        case UserRole.ADMIN:
            return QueryParamsWithAdminRoleSchema;
        case UserRole.TEACHER:
            return QueryParamsWithTeacherRoleSchema;
        case UserRole.STUDENT:
            return QueryParamsWithStudentRoleSchema;
        default:
            throw Error("Unsupported role");
    }
}
