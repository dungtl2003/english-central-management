import {NextRequest, NextResponse} from "next/server";
import {db} from "@/lib/db";
import {auth} from "@clerk/nextjs/server";
import {Post, PostSchema} from "./schema";
import {addTeacher, authGetHandler} from "./helper";

/**
 * Get teachers.
 * Admin can get all teachers.
 * Teacher, student, parent cannot use this api.
 */
export async function GET(req: NextRequest) {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("GET ", req.nextUrl.pathname);

    try {
        await authGetHandler();
    } catch (error) {
        console.error("Error: ", (<Error>error).message);
        return NextResponse.json({error: error}, {status: 401});
    }

    try {
        const teachers = await db.teacher.findMany({include: {user: true}});
        return NextResponse.json(teachers, {status: 200});
    } catch (error) {
        console.error("Error: ", error);
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
        console.error("Error: ", validBody.error.flatten());
        return NextResponse.json({error: "Wrong body format"}, {status: 400});
    }

    if (clerkUserId !== validBody.data.id) {
        return NextResponse.json(
            {error: "Cannot create teacher with different ID"},
            {status: 400}
        );
    }

    try {
        const [teacher] = await addTeacher(clerkUserId);
        return NextResponse.json(teacher, {status: 200});
    } catch (error) {
        console.error("Error: ", (<Error>error).message);
        return NextResponse.json(
            {error: "Failed to create teacher"},
            {status: 500}
        );
    }
}
