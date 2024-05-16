import {NextResponse} from "next/server";
import {db} from "@/lib/db";

export async function GET(req: Request) {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("GET ", req.url);
    try {
        const teachers = await db.teacher.findMany();
        return new NextResponse(JSON.stringify(teachers), {status: 200});
    } catch (error) {
        console.log(error);
        return new NextResponse(
            JSON.stringify({error: "Failed to get teachers"}),
            {status: 500}
        );
    }
}
