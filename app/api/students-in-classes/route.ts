import {db} from "@/lib/db";
import {authHandler, getClerkRole} from "@/lib/helper";
import {auth} from "@clerk/nextjs/server";
import {UserRole} from "@prisma/client";
import {NextRequest, NextResponse} from "next/server";

/**
 * Get all students who is waiting to be added to the class or the student
 * who is already in the class.
 * Only admin can access this api.
 */
export async function GET(req: NextRequest) {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("GET ", req.nextUrl.pathname);

    try {
        await authHandler();

        const clerkUserId = auth().userId;
        const role: UserRole | null = getClerkRole();

        if (!role || role !== UserRole.ADMIN) {
            throw Error("No right permission");
        }

        const admin = await db.user.findFirst({
            where: {
                referId: clerkUserId!,
                role: "ADMIN",
            },
        });

        if (!admin) {
            throw new Error(
                `No admin with refer ID ${clerkUserId} found in database`
            );
        }
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
