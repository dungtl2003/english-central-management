import {
    Attendance,
    Class,
    Parent,
    Session,
    Student,
    Tuition,
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
        sessions: ({
            attendances: Attendance[];
        } & Session)[];
        tuitions: Tuition[];
    } & Class)[];
} & Student;

export type PatchResponsePayload = string;
