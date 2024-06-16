import {db} from "@/lib/db";
import {NextRequest, NextResponse} from "next/server";
import {Patch, PatchSchema} from "./schema";
import {
    authPatchHandler,
    buildAttendanceCreateManySessionInputEnvelope,
    validateStudyTime,
} from "./helper";

/**
 * Update session actual study time.
 * Only teacher with right ID can access this api.
 * Actual study time must not overlap with other time that the teacher teach.
 * Actual study time must not be before class's start time or after class's end
 * time.
 */
export async function PATCH(
    req: NextRequest,
    {params}: {params: {sessionId: string}}
) {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("PATCH ", req.url);

    let teacherId;
    try {
        teacherId = await authPatchHandler();
    } catch (error) {
        console.error("Error: ", (<Error>error).message);
        return NextResponse.json(
            {error: (<Error>error).message},
            {status: 401}
        );
    }

    const body: Patch = await req.json();
    const validBody = PatchSchema.safeParse(body);
    if (validBody.error) {
        console.error("Error: ", validBody.error.flatten());
        return NextResponse.json({error: "Wrong body format"}, {status: 400});
    }

    let session;
    try {
        session = await db.session.findFirst({
            where: {
                id: params.sessionId,
                class: {
                    teacherId: teacherId,
                },
            },

            include: {
                class: {
                    include: {
                        unit: true,
                    },
                },
            },
        });

        if (!session) {
            const msg = "No session found";
            console.error(`Error: ${msg}`);
            return NextResponse.json({error: msg}, {status: 400});
        }

        if (session.actualStartTime) {
            const msg = "Start time in session is already set";
            console.error(`Error: ${msg}`);
            return NextResponse.json({error: msg}, {status: 400});
        }

        await validateStudyTime(
            teacherId,
            session.class.id,
            session.id,
            new Date(session.class.startTime),
            new Date(session.class.endTime),
            new Date(validBody.data.actualTime),
            session.class.unit.studyHour,
            session.class.unit.studyMinute
        );
    } catch (error) {
        const msg = (<Error>error).message;
        console.error("Error: ", msg);
        return NextResponse.json({error: msg}, {status: 400});
    }

    try {
        const students = await db.studentsInClasses.findMany({
            where: {
                classId: session!.classId,
                approvedAt: {
                    lte: validBody.data.actualTime,
                },
            },
        });

        const updatedSession = await db.session.update({
            where: {
                id: session!.id,
            },
            data: {
                actualStartTime: validBody.data.actualTime,
                updatedAt: new Date(),
                attendances: {
                    createMany:
                        buildAttendanceCreateManySessionInputEnvelope(students),
                },
            },
        });

        return NextResponse.json({updatedSession}, {status: 200});
    } catch (error) {
        const msg = (<Error>error).message;
        console.error("Error: ", msg);
        return NextResponse.json({error: msg}, {status: 500});
    }
}
