import {db} from "@/lib/db";
import {getClerkRole} from "@/lib/helper";
import {auth} from "@clerk/nextjs/server";
import {UserRole} from "@prisma/client";
import {NextRequest, NextResponse} from "next/server";

export async function GET(req: NextRequest) {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("GET ", req.nextUrl.pathname);

    //try {
    //    await authHandler();
    //} catch (error) {
    //    console.log("Error: ", (<Error>error).message);
    //    return NextResponse.json({error: error}, {status: 401});
    //}

    const clerkUserId = auth().userId;
    const role: UserRole | null = getClerkRole();

    if (!role) {
        return NextResponse.json({error: "No right permission"}, {status: 401});
    }

    try {
        const user = await db.user.findFirst({
            where: {
                referId: clerkUserId as string,
            },
        });

        let userId: string | undefined;
        if (role === UserRole.ADMIN) {
            await db.admin
                .findFirst({
                    where: {
                        userId: user?.id,
                    },
                })
                .then((value) => (userId = value?.id));
        } else if (role === UserRole.TEACHER) {
            await db.teacher
                .findFirst({
                    where: {
                        userId: user?.id,
                    },
                })
                .then((value) => (userId = value?.id));
        } else if (role === UserRole.STUDENT) {
            await db.student
                .findFirst({
                    where: {
                        userId: user?.id,
                    },
                })
                .then((value) => (userId = value?.id));
        } else {
            await db.parent
                .findFirst({
                    where: {
                        userId: user?.id,
                    },
                })
                .then((value) => (userId = value?.id));
        }

        console.log("Got userId: ", userId);
        return NextResponse.json(userId, {status: 200});
    } catch (error) {
        console.log("Error: ", (<Error>error).message);
        return NextResponse.json({error: "Failed to get class"}, {status: 500});
    }
}
