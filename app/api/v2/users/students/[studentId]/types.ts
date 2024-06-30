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
import {z} from "zod";
import {PatchRequestPayloadSchema} from "./schema";

export type PatchRequestPayload = z.infer<typeof PatchRequestPayloadSchema>;

export type GetResponsePayload = {
    user: User;
    parents: ({
        user: User;
    } & Parent)[];
    classes: ({
        approvedAt: Date | null;
        rejectedAt: Date | null;
        leftAt: Date | null;
        unit: Unit;
        students: StudentsInClasses[];
        sessions: ({
            attendances: Attendance[];
        } & Session)[];
        tuitions: Tuition[];
    } & Class)[];
} & Student;

export type PatchResponsePayload = string;

export type DeleteResponsePayload = string;
