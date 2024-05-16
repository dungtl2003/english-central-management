import {db} from "@/lib/db";
import {NextResponse} from "next/server";
import {UserRole} from "@prisma/client";
import {authHandler} from "@/lib/helper";

export async function GET(req: Request) {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("GET ", req.url);

    try {
        await authHandler([UserRole.admin, UserRole.teacher]);
    } catch (error) {
        return new NextResponse(JSON.stringify(error), {status: 401});
    }

    const teacherId = req.url.substring(req.url.lastIndexOf("/") + 1);
    const teacher = await db.user.findFirst({
        where: {
            referId: teacherId,
        },
        include: {
            teacher: true,
        },
    });

    return new NextResponse(JSON.stringify(teacher), {status: 200});
}
