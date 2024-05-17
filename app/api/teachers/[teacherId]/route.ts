import {db} from "@/lib/db";
import {NextResponse} from "next/server";
import {UserRole} from "@prisma/client";
import {authHandler} from "@/lib/helper";

export async function GET(req: Request) {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("GET ", req.url);

    try {
        await authHandler([UserRole.ADMIN, UserRole.TEACHER]);
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return new NextResponse((<Error>error).message, {status: 401});
    }

    const teacherId = req.url.substring(req.url.lastIndexOf("/") + 1);

    let teacher;
    try {
        teacher = await db.user.findFirst({
            where: {
                referId: teacherId,
            },
            include: {
                teacher: true,
            },
        });
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return new NextResponse("Error: Failed to get teacher", {status: 500});
    }

    return new NextResponse(JSON.stringify(teacher), {status: 200});
}