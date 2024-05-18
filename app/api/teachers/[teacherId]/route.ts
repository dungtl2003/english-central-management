import {db} from "@/lib/db";
import {NextResponse} from "next/server";
import {UserRole} from "@prisma/client";
import {auth} from "@clerk/nextjs/server";
import {authHandler, getClerkRole} from "@/lib/helper";

/**
 * Get teacher's detail information.
 * Only teacher and admin can use this api. Admin can get information of
 * every teachers, while teacher can only get his/her own information.
 */
export async function GET(req: Request) {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("GET ", req.url);

    try {
        await authHandler();
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return new NextResponse((<Error>error).message, {status: 401});
    }

    const clerkUserId = auth().userId;
    const teacherId = req.url.substring(req.url.lastIndexOf("/") + 1);
    const role: UserRole | null = getClerkRole();

    if (
        !role ||
        (role !== UserRole.ADMIN && role !== UserRole.TEACHER) ||
        (role === UserRole.TEACHER && clerkUserId !== teacherId)
    ) {
        return new NextResponse("No right permission", {status: 401});
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

        console.log("Get teacher: ", teacher);
        return new NextResponse(JSON.stringify(teacher), {status: 200});
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return new NextResponse("Error: Failed to get teacher", {status: 500});
    }
}
