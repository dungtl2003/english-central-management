/**
 * Manually test teacher page.
 * Need to turn off security for:
 * /api/units
 * /api/classes
 * /api/sessions
 *
 * for money testing, change the db query data of:
 * /api/attendances
 *
 * Remove fake data:
 * DELETE FROM "Unit";
 * DELETE FROM "User" WHERE role='STUDENT';
 * DELETE FROM "User" WHERE role='PARENT';
 */
import {
    Attendance,
    Class,
    Session,
    Student,
    Teacher,
    Unit,
    User,
} from "@prisma/client";
import {Time} from "../time";
import {Schedule} from "@/app/api/classes/schema";
import {getRandomInt} from "../utils";
import {Patch} from "@/app/api/sessions/[sessionId]/schema";

type TempStudent = User & {
    student: Student;
};

type MySession = Session & {
    class: Class & {
        unit: Unit;
        teacher: Teacher & {
            user: User;
        };
    };
};

const attendanceStatus: Record<number, string> = {
    0: "LATE",
    1: "ABSENT",
    2: "PRESENT",
};

type PatchAttendance = {
    description: string | null;
    status: string;
    attendanceId: string;
};

type PatchAttendances = {
    attendances: PatchAttendance[];
    sessionId: string;
};

interface PostUnit {
    year: number;
    grade: number;
    maxSessions: number;
    maxStudents: number;
    studyHour: number;
    studyMinute: number;
    studySecond: number;
    pricePerSession: number;
}

interface PostClass {
    unitId: string;
    teacherId: string;
    startDate: Date;
    timeZone: string;
    schedules: Schedule[];
}

export const bypass = async (teacherId: string): Promise<void> => {
    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;

    const unitUrl = `${protocol}://${domain}/api/units`;
    const classUrl = `${protocol}://${domain}/api/classes`;
    const tempStudentUrl = `${protocol}://${domain}/api/bypass/add-temp-students`;
    const addStudentToClassUrl = `${protocol}://${domain}/api/bypass/add-students-to-class`;
    const sessionsUrl = `${protocol}://${domain}/api/sessions`;
    const attendancesUrl = `${protocol}://${domain}/api/attendances`;

    const unit: Unit = await createUnit(unitUrl);
    if (!unit.id) return;

    const cls = await createClassFromUnit(unit, classUrl, teacherId);
    if (!cls.id) return;

    const students = await createTempStudents(40, tempStudentUrl);
    if (students.length === 0) return;

    await addStudentsToClass(
        cls.id,
        students,
        addStudentToClassUrl,
        new Date(cls.startTime),
        new Date(cls.startTime)
    );

    await attendStudents(sessionsUrl, attendancesUrl, 100);
};

const createUnit = async (unitUrl: string) => {
    const tempUnitBody: PostUnit = {
        year: 2022,
        grade: 3,
        maxSessions: 200,
        maxStudents: 120,
        studyHour: 2,
        studyMinute: 30,
        studySecond: 0,
        pricePerSession: 5.99,
    };

    const unitRes = await fetch(unitUrl, {
        method: "POST",
        body: JSON.stringify(tempUnitBody),
    });
    const unit: Unit = await unitRes.json();
    return unit;
};

const createClassFromUnit = async (
    unit: Unit,
    classUrl: string,
    teacherId: string
) => {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 25);
    const tempClassBody: PostClass = {
        unitId: unit.id,
        teacherId: teacherId,
        startDate: startDate,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        schedules: [],
    };

    const startTime = [
        "23:45:00", //1
        "07:00:00", //4
        "15:30:00", //1
    ];
    const dow = [1, 4, 1];
    for (let i = 0; i < 3; i++) {
        const t = Time.from(startTime[i]);
        tempClassBody.schedules.push({
            dayOfWeek: dow[i],
            startHour: t.hour,
            startMinute: t.minute,
            startSecond: t.second,
        });
    }

    const classRes = await fetch(classUrl, {
        method: "POST",
        body: JSON.stringify(tempClassBody),
    });

    const cls: Class = await classRes.json();
    return cls;
};

const createTempStudents = async (
    numOfStudents: number,
    url: string
): Promise<TempStudent[]> => {
    const body = {
        numOfStudents: numOfStudents,
    };
    const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
    });
    const students: TempStudent[] = await res.json();
    return students;
};

const addStudentsToClass = async (
    classId: string,
    students: TempStudent[],
    url: string,
    startDate: Date,
    endDate: Date
) => {
    const body = {
        classId: classId,
        students: students,
        startDate,
        endDate,
    };
    await fetch(url, {
        method: "POST",
        body: JSON.stringify(body),
    });
};

const attendStudents = async (
    sessionsUrl: string,
    attendancesUrl: string,
    numberOfSessions: number
) => {
    const res = await fetch(sessionsUrl, {
        method: "GET",
    });

    let sessions: MySession[] = await res.json();
    sessions = sessions
        .sort(
            (s1, s2) =>
                new Date(s1.estimatedStartTime).getTime() -
                new Date(s2.estimatedStartTime).getTime()
        )
        .slice(0, numberOfSessions);

    for (const s of sessions) {
        const body = {
            actualTime: s.estimatedStartTime,
        } as Patch;

        await fetch(sessionsUrl + "/" + s.id, {
            method: "PATCH",
            body: JSON.stringify(body),
        });

        const attendancesRes = await fetch(
            `${sessionsUrl}/${s.id}/attendances`,
            {
                method: "GET",
            }
        );

        const {attendances} = (await attendancesRes.json()) as {
            attendances: Attendance[];
        };
        await fetch(`${attendancesUrl}`, {
            method: "PATCH",
            body: JSON.stringify({
                sessionId: s.id,
                attendances: attendances.map((a) => {
                    return {
                        attendanceId: a.id,
                        status: attendanceStatus[getRandomInt(0, 2)],
                    } as PatchAttendance;
                }),
            } as PatchAttendances),
        });
    }
};
