export const dynamic = "force-dynamic";

import {db} from "@/lib/db";
import {NextRequest, NextResponse} from "next/server";
import {authGetHandler} from "./helper";

/**
 * Get all students who is waiting to be added to the class or the student
 * who is already in the class.
 * Only admin can access this api.
 */
export async function GET(req: NextRequest) {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("GET ", req.nextUrl.pathname);

    try {
        await authGetHandler();
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return new NextResponse((<Error>error).message, {status: 401});
    }

    try {
        const students = await db.studentsInClasses.findMany({});
        return NextResponse.json(students, {status: 200});
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return NextResponse.json(
            {error: "Failed to find students"},
            {status: 500}
        );
    }
}
