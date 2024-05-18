import {NextResponse} from "next/server";
import {db} from "@/lib/db";
import {authHandler, getClerkRole} from "@/lib/helper";
import {UserRole} from "@prisma/client";
import {auth, clerkClient} from "@clerk/nextjs/server";
import {PostTeacher, PostTeacherSchema} from "./schema";

export async function GET(req: Request) {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("GET ", req.url);

    try {
        await authHandler();
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return new NextResponse((<Error>error).message, {status: 401});
    }

    const role: UserRole | null = getClerkRole();
    if (!role || role !== UserRole.ADMIN) {
        return new NextResponse("Error: No right permission", {status: 401});
    }

    try {
        const teachers = await db.teacher.findMany({include: {user: true}});
        console.log("Get teachers: ", teachers);
        return new NextResponse(JSON.stringify(teachers), {status: 200});
    } catch (error) {
        console.log("Error: ", error);
        return new NextResponse("Error: Failed to get teachers", {status: 500});
    }
}

export async function POST(req: Request) {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("GET ", req.url);

    const clerkUserId = auth().userId;
    if (!clerkUserId) {
        return new NextResponse("Error: No signed in user", {status: 401});
    }

    const body: PostTeacher = await req.json();
    const validBody = PostTeacherSchema.safeParse(body);
    if (validBody.error) {
        console.log("Error: ", validBody.error.flatten());
        return new NextResponse("Error: Wrong body format", {status: 400});
    }

    if (clerkUserId !== validBody.data.id) {
        return new NextResponse(
            "Error: Cannot create teacher with different ID",
            {status: 400}
        );
    }

    try {
        const [teacher, clerkUser] = await Promise.all([
            db.user.update({
                where: {
                    referId: clerkUserId,
                },
                data: {
                    role: validBody.data.role,
                    firstName: validBody.data.firstName,
                    lastName: validBody.data.lastName,
                    teacher: {
                        create: {},
                    },
                },
                include: {
                    teacher: true,
                },
            }),
            clerkClient.users.updateUser(clerkUserId, {
                firstName: validBody.data.firstName,
                lastName: validBody.data.lastName,
                publicMetadata: {
                    role: validBody.data.role,
                },
            }),
        ]);

        console.log("Created teacher: ", teacher);
        console.log("Updated clerk user: ", clerkUser);
        return new NextResponse(JSON.stringify(teacher), {status: 200});
    } catch (error) {
        console.log("Error: ", error);
        return new NextResponse("Error: Failed to create teacher", {
            status: 500,
        });
    }
}

export async function PUT(req: Request) {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("GET ", req.url);

    try {
        await authHandler();
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return new NextResponse((<Error>error).message, {status: 401});
    }

    const role: UserRole | null = getClerkRole();
    if (!role || role !== UserRole.TEACHER) {
        return new NextResponse("Error: No right permission", {status: 401});
    }
}
