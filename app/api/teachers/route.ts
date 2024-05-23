import {NextRequest, NextResponse} from "next/server";
import {db} from "@/lib/db";
import {authHandler, getClerkRole} from "@/lib/helper";
import {auth, clerkClient} from "@clerk/nextjs/server";
import {Post, PostSchema} from "./schema";
import {UserRole} from "@prisma/client";

/**
 * Get teachers.
 * Admin can get all teachers.
 * Teacher, student, parent cannot use this api.
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

    const role: UserRole | null = getClerkRole();
    if (!role || role !== UserRole.ADMIN) {
        return NextResponse.json({error: "No right permission"}, {status: 401});
    }

    try {
        const teachers = await db.teacher.findMany({include: {user: true}});
        console.log("Got teachers: ", teachers);
        return NextResponse.json(teachers, {status: 200});
    } catch (error) {
        console.log("Error: ", error);
        return NextResponse.json(
            {error: "Failed to get teachers"},
            {status: 500}
        );
    }
}

/**
 * Add teacher.
 * Only user who chose teacher role can use this api.
 */
export async function POST(req: NextRequest) {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("POST ", req.nextUrl.pathname);

    const clerkUserId = auth().userId;
    if (!clerkUserId) {
        return NextResponse.json({error: "No signed in user"}, {status: 401});
    }

    const body: Post = await req.json();
    const validBody = PostSchema.safeParse(body);
    if (validBody.error) {
        console.log("Error: ", validBody.error.flatten());
        return NextResponse.json({error: "Wrong body format"}, {status: 400});
    }

    if (clerkUserId !== validBody.data.id) {
        return NextResponse.json(
            {error: "Cannot create teacher with different ID"},
            {status: 400}
        );
    }

    try {
        const teacher = await db.user.update({
            where: {
                referId: clerkUserId,
            },
            data: {
                teacher: {
                    create: {},
                },
            },
            include: {
                teacher: true,
            },
        });

        const clerkUser = await clerkClient.users.updateUser(clerkUserId, {
            publicMetadata: {
                role: validBody.data.role,
            },
        });

        console.log("Created teacher: ", teacher);
        console.log("Updated clerk user: ", clerkUser);
        return NextResponse.json(teacher, {status: 200});
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return NextResponse.json(
            {error: "Failed to create teacher"},
            {status: 500}
        );
    }
}
