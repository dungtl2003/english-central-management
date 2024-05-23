import {NextRequest, NextResponse} from "next/server";
import {BaseQueryParams, getSchemaByRole} from "./schema";
import {db} from "@/lib/db";
import {Json} from "@/constaints";
import {
    authHandler,
    convertQueryParamsToJsonObject,
    getClerkRole,
} from "@/lib/helper";
import {UserRole} from "@prisma/client";
import {auth} from "@clerk/nextjs/server";

/**
 * Get classes.
 * This will return the class, unit and teacher.
 * Admin gets all classes.
 * Teacher gets all classes he/she teaches.
 * Student gets all classes.
 * Parent gets all classes.
 */
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
    const clerkUserId = auth().userId;
    const jsonObj: Json = convertQueryParamsToJsonObject(
        req.nextUrl.searchParams
    );
    const queryParams: BaseQueryParams = jsonObj;
    if (
        !role ||
        (role === UserRole.TEACHER && queryParams.teacherId !== clerkUserId)
    ) {
        return NextResponse.json({error: "No right permission"}, {status: 401});
    }

    const result = getSchemaByRole(role).safeParse(queryParams);
    if (!result.success) {
        console.log("Error: ", result.error.flatten());
        return NextResponse.json({error: "Wrong query param"}, {status: 400});
    }

    try {
        const classes = await db.class.findMany({
            where: {
                teacherId: queryParams.teacherId,
            },
            include: {
                unit: true,
                teacher: {
                    select: {
                        user: true,
                    },
                },
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
