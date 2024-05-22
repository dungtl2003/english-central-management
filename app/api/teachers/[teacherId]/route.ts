import {db} from "@/lib/db";
import {NextRequest, NextResponse} from "next/server";
import {auth} from "@clerk/nextjs/server";
import {authHandler, getClerkRole} from "@/lib/helper";
import {getPatchSchema} from "./handler";
import {UserRole} from "@/constaints";

/**
 * Get teacher's detail information.
 * Only teacher and admin can use this api. Admin can get information of
 * every teachers, while teacher can only get his/her own information.
 */
export async function GET(req: NextRequest) {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("GET ", req.nextUrl.pathname);

    try {
        await authHandler();
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return NextResponse.json({error: error}, {status: 401});
    }

    const clerkUserId = auth().userId;
    const teacherId = req.url.substring(req.url.lastIndexOf("/") + 1);
    const role: UserRole | null = getClerkRole();

    if (
        !role ||
        (role !== UserRole.ADMIN && role !== UserRole.TEACHER) ||
        (role === UserRole.TEACHER && clerkUserId !== teacherId)
    ) {
        return NextResponse.json({error: "No right permission"}, {status: 401});
    }

    try {
        const teacher = await db.user.findFirst({
            where: {
                referId: teacherId,
            },
            include: {
                teacher: true,
            },
        });

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

export async function PATCH(req: NextRequest) {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("PATCH ", req.nextUrl.pathname);

    try {
        await authHandler();
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return NextResponse.json({error: error}, {status: 401});
    }

    const clerkUserId = auth().userId;
    const teacherId = req.url.substring(req.url.lastIndexOf("/") + 1);
    const role: UserRole | null = getClerkRole();

    if (
        !role ||
        (role !== UserRole.ADMIN && role !== UserRole.TEACHER) ||
        (role === UserRole.TEACHER && clerkUserId !== teacherId)
    ) {
        return NextResponse.json({error: "No right permission"}, {status: 401});
    }

    const body = await req.json();
    const validBody = getPatchSchema(role).safeParse(body);
    if (validBody.error) {
        console.log("Error: ", validBody.error.flatten());
        return NextResponse.json({error: "Wrong body format"}, {status: 400});
    }

    try {
        const teacher = await db.user.update({
            where: {
                referId: teacherId,
            },
            data: {
                ...validBody.data,
                teacher: {
                    update: {
                        ...validBody.data,
                    },
                },
            },
            include: {
                teacher: true,
            },
        });

        console.log("Updated teacher: ", teacher);
        return NextResponse.json(teacher, {status: 200});
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return NextResponse.json(
            {error: "Failed to get teacher"},
            {status: 500}
        );
    }
}
