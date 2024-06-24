import {db} from "@/lib/db";
import {getRandomDate} from "@/lib/utils";
import {Student, User} from "@prisma/client";
import {NextRequest, NextResponse} from "next/server";

type TempStudent = User & {
    student: Student;
};

interface Body {
    classId: string;
    students: TempStudent[];
    startDate: Date;
    endDate: Date;
}

export async function POST(req: NextRequest) {
    const {students, classId, startDate, endDate} = (await req.json()) as Body;

    students.forEach(async (student) => {
        await db.studentsInClasses.create({
            data: {
                classId: classId,
                studentId: student.student.id,
                approvedAt: getRandomDate(
                    new Date(startDate),
                    new Date(endDate)
                ),
            },
        });
    });

    return NextResponse.json("ok", {status: 200});
}
