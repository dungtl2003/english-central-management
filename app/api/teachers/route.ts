import {NextResponse} from "next/server";
import {db} from "@/lib/db";
import {authHandler, getClerkRole} from "@/lib/helper";
import {UserRole} from "@prisma/client";
import {auth} from "@clerk/nextjs/server";

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
        return new NextResponse("No right permission", {status: 401});
    }

    try {
        const teachers = await db.teacher.findMany({include: {user: true}});
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
        throw new Error("No signed in user");
    }
}
