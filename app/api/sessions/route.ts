import {db} from "@/lib/db";
import {NextRequest, NextResponse} from "next/server";
import {authGetHandler} from "./helper";

/**
 * Get sessions and class, teacher's details along each session.
 * Only admin can access this api.
 */
export async function GET(req: NextRequest) {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("GET ", req.url);

    //TESTING
    try {
        await authGetHandler();
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return NextResponse.json(
            {error: (<Error>error).message},
            {status: 401}
        );
    }

    try {
        const sessions = await db.session.findMany({
            include: {
                class: {
                    include: {
                        unit: true,
                        teacher: {
                            include: {
                                user: true,
                            },
                        },
                    },
                },
            },
        });

        return NextResponse.json(sessions, {status: 200});
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return NextResponse.json(
            {error: "Failed to get sessions"},
            {status: 500}
        );
    }
}
