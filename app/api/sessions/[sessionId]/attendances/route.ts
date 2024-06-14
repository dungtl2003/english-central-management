import {db} from "@/lib/db";
import {NextRequest, NextResponse} from "next/server";
import {handleAuth} from "../../helper";

/**
 * Get all attendances of this session.
 * Only teacher with right ID can access this api.
 */
export async function GET(
    req: NextRequest,
    {params}: {params: {sessionId: string}}
) {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("GET ", req.url);

    let teacherId;
    try {
        teacherId = await handleAuth();
    } catch (error) {
        console.error("Error: ", (<Error>error).message);
        return NextResponse.json(
            {error: (<Error>error).message},
            {status: 401}
        );
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
        });

        if (!session) {
            const msg = "No session found";
            console.error(`Error: ${msg}`);
            return NextResponse.json({error: msg}, {status: 400});
        }
    } catch (error) {
        const msg = (<Error>error).message;
        console.error("Error: ", msg);
        return NextResponse.json({error: msg}, {status: 400});
    }

    try {
        const attendances = await db.attendance.findMany({
            where: {
                sessionId: params.sessionId,
            },
        });

        return NextResponse.json({attendances}, {status: 200});
    } catch (error) {
        const msg = (<Error>error).message;
        console.error("Error: ", msg);
        return NextResponse.json({error: msg}, {status: 500});
    }
}
