import {db} from "@/lib/db";
import {NextRequest, NextResponse} from "next/server";
import {buildAttendanceUpdateQueries, authPatchHandler} from "./helper";
import {Patch, PatchSchema} from "./schema";

/**
 * Update attendances.
 * Only teacher with right ID can access this api.
 */
export async function PATCH(req: NextRequest) {
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

    try {
        const session = await db.session.findFirst({
            where: {
                id: validBody.data.sessionId,
                class: {
                    teacherId: teacherId,
                },
            },
        });

        if (!session) {
            const msg = `Cannot find session with id ${validBody.data.sessionId} in the database`;
            console.error("Error: ", msg);
            return NextResponse.json({error: msg}, {status: 400});
        }

        await db.$transaction([
            db.session.update({
                where: {
                    id: session.id,
                },
                data: {
                    attendedTime: session.attendedTime ?? new Date(),
                },
                // TESTING: only for testing purpose
                //data: {
                //    attendedTime:
                //        session.attendedTime ?? session.actualStartTime,
                //},
            }),
            ...buildAttendanceUpdateQueries(
                session.id,
                validBody.data.attendances
            ),
        ]);

        return NextResponse.json("ok", {status: 200});
    } catch (error) {
        const msg = (<Error>error).message;
        console.error("Error: ", msg);
        return NextResponse.json({error: msg}, {status: 500});
    }
}
