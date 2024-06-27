import {
    Attendance,
    Class,
    Parent,
    Session,
    Student,
    Tuition,
    User,
} from "@prisma/client";

export type GetResponsePayload = {
    user: User;
    parents: ({
        user: User;
    } & Parent)[];
    classes: ({
        sessions: ({
            attendances: Attendance[];
        } & Session)[];
        tuitions: Tuition[];
    } & Class)[];
} & Student;
