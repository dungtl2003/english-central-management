import {
    Attendance,
    ChildrenParents,
    Class,
    Parent,
    Session,
    Student,
    StudentsInClasses,
    Tuition,
    Unit,
    User,
} from "@prisma/client";

export type AdminGetResponsePayload = {
    unit: Unit;
    sessions: ({
        attendances: Attendance[];
    } & Session)[];
    students: ({
        student: {
            user: User;
        } & Student;
    } & StudentsInClasses)[];
} & Class;

export type TeacherGetResponsePayload = {
    unit: Unit;
    sessions: ({
        attendances: ({
            student: {
                user: User;
            } & Student;
        } & Attendance)[];
    } & Session)[];
    students: ({
        student: {
            user: User;
            tuitions: Tuition[];
            parents: ({
                parent: {
                    user: User;
                } & Parent;
            } & ChildrenParents)[];
            attendances: ({
                session: Session;
            } & Attendance)[];
        } & Student;
    } & StudentsInClasses)[];
} & Class;
