import {Gender} from "@prisma/client";
import {NextRequest, NextResponse} from "next/server";
import {z} from "zod";

const GenderEnum = z.nativeEnum(Gender, {
    invalid_type_error: 'Gender must be "MALE" or "FEMALE"',
    description: "Gender of user",
});
type GenderEnum = z.infer<typeof GenderEnum>;

export async function GET(req: NextRequest) {
    console.log("Timestamp: ", new Date().toLocaleString());
    console.log("GET ", req.nextUrl.pathname);

    const data = GenderEnum.safeParse(0);

    console.log(data);

    return NextResponse.json(GenderEnum.description, {status: 200});

    // try {
    //     await authHandler();
    // } catch (error) {
    //     console.log("Error: ", (<Error>error).message);
    //     return NextResponse.json({error: error}, {status: 401});
    // }

    // const role: UserRole | null = getClerkRole();
    // if (!role || role !== UserRole.ADMIN) {
    //     return NextResponse.json({error: "No right permission"}, {status: 401});
    // }

    // try {
    //     const teachers = await db.teacher.findMany({include: {user: true}});
    //     console.log("Got teachers: ", teachers);
    //     return NextResponse.json(teachers, {status: 200});
    // } catch (error) {
    //     console.log("Error: ", error);
    //     return NextResponse.json(
    //         {error: "Failed to get teachers"},
    //         {status: 500}
    //     );
    // }
}
