import {ActionState} from "@/lib/create-safe-action";
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
import {RequestSchena} from "./schema";

export type InputType = z.infer<typeof RequestSchena>;

export type OutputType = {
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

export type ReturnType = ActionState<InputType, OutputType>;
