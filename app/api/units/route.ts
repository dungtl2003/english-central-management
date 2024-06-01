import {NextRequest, NextResponse} from "next/server";
import {Post, PostSchema} from "./schema";
import {db} from "@/lib/db";
import {authHandler, getClerkRole} from "@/lib/helper";
import {auth} from "@clerk/nextjs/server";
import {UserRole} from "@prisma/client";

/**
 * Add unit.
 * Only admin can access this api.
 */
export async function POST(req: NextRequest) {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("POST ", req.nextUrl.pathname);

    try {
        await authHandler();
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return NextResponse.json({error: error}, {status: 401});
    }

    const clerkUserId = auth().userId;
    const role: UserRole | null = getClerkRole();

    if (!role || role !== UserRole.ADMIN) {
        return NextResponse.json({error: "No right permission"}, {status: 401});
    }

    try {
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
        return NextResponse.json({error: "No right permission"}, {status: 401});
    }

    const body: Post = await req.json();
    const validBody = PostSchema.safeParse(body);
    if (validBody.error) {
        console.log("Error: ", validBody.error.flatten());
        return NextResponse.json({error: "Wrong body format"}, {status: 400});
    }

    try {
        const unit = await db.unit.create({
            data: {
                year: validBody.data!.year,
                grade: validBody.data!.grade,
                maxSessions: validBody.data!.maxSessions,
                maxStudents: validBody.data!.maxStudents,
                studyHour: validBody.data!.studyHour,
                studyMinute: validBody.data!.studyMinute,
                studySecond: validBody.data!.studySecond,
                pricePerSession: validBody.data!.pricePerSession,
            },
        });

        console.log("Added unit: ", unit);
        return NextResponse.json(unit, {status: 200});
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return NextResponse.json(
            {error: "Failed to create unit"},
            {status: 500}
        );
    }
}
