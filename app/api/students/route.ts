import {NextRequest, NextResponse} from "next/server";
import {db} from "@/lib/db";
import {authHandler, getClerkRole} from "@/lib/helper";
import {UserRole} from "@/constaints";

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
    if (!role || (role !== UserRole.ADMIN && role !== UserRole.PARENT)) {
        return NextResponse.json({error: "No right permission"}, {status: 401});
    }

    try {
        const students = await db.student.findMany({include: {user: true}});
        console.log("Got students: ", students);
        return NextResponse.json(students, {status: 200});
    } catch (error) {
        console.log("Error: ", error);
        return NextResponse.json(
            {error: "Failed to get teachers"},
            {status: 500}
        );
    }
}
