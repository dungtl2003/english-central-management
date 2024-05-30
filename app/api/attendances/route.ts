import {db} from "@/lib/db";
import {authHandler, getClerkRole} from "@/lib/helper";
import {auth} from "@clerk/nextjs/server";
import {Prisma, UserRole} from "@prisma/client";
import {NextRequest, NextResponse} from "next/server";
import {Post, PostSchema} from "./schema";
import {compareDate} from "@/lib/utils";

//TODO: wrong logic, need to fix
/**
 * Add attendance.
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
        const _class = await db.class.findFirst({
            where: {
                id: validBody.data.classId,
                students: {
                    some: {
                        studentId: validBody.data.studentId,
                    },
                },
            },
            include: {
                schedules: true,
                unit: true,
            },
        });
        const now = new Date();
        const begin: Date =
            compareDate(now, _class!.startTime, true) < 0
                ? _class!.startTime
                : now;

        const dateList: Date[] = [];
        const sessions = _class!.unit.maxSessions;
        const dowScedules: number[] | undefined = _class?.schedules.map(
            (schedule) => schedule.startTime.getDay()
        );
        let current = 0;
        while (current < sessions) {
            if (dowScedules!.includes(begin.getDay())) {
                dateList.push(new Date(begin));
                current++;
            }

            begin.setDate(begin.getDate() + 1);
        }

        const attendancesObjs: Prisma.AttendanceCreateManyInput[] =
            dateList.map((date) => {
                return {
                    studentId: validBody.data.studentId,
                    sessionId: validBody.data.classId,
                    status: "ABSENT",
                    createdAt: date,
                };
            });

        const attendances = await db.attendance.createMany({
            data: attendancesObjs!,
        });

        return NextResponse.json(`Added attendances: ${attendances}`, {
            status: 200,
        });
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return NextResponse.json(
            {error: "Failed to create attendances"},
            {status: 500}
        );
    }
}
