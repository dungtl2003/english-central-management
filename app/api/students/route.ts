import {auth} from "@clerk/nextjs/server";
import {NextRequest, NextResponse} from "next/server";
import {Post, PostSchema} from "./schema";
import {addStudent} from "./helper";

/**
 * Add student.
 * Only user who chose student role can use this api.
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
            {error: "Cannot create student with different ID"},
            {status: 400}
        );
    }

    try {
        const [student, clerkUser] = await addStudent(clerkUserId);
        console.log("Created student: ", student);
        console.log("Updated clerk user: ", clerkUser);
        return NextResponse.json(student, {status: 200});
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return NextResponse.json(
            {error: "Failed to create student"},
            {status: 500}
        );
    }
}
