import {
    Attendance,
    Class,
    Parent,
    Session,
    Student,
    StudentsInClasses,
    Tuition,
    Unit,
    User,
} from "@prisma/client";

export enum StudentStatus {
    ACTIVE = "Active",
    DELETED = "Deleted",
}

export type StudentDetailData = {studentInfoData: StudentInfoData} & {
    studentDesiredClassesData: StudentClassesData[];
    studentaCurrentClassesData: StudentClassesData[];
};

export type StudentInfoData = Student & {
    user: User;
    parents: ({
        user: User;
    } & Parent)[];
};

export type StudentClassesData = Class & {
    rejectedAt: Date | null;
    approvedAt: Date | null;
    unit: Unit;
    students: StudentsInClasses[];
    sessions: ({
        attendances: Attendance[];
    } & Session)[];
    tuitions: Tuition[];
};
