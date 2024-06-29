import {ActionState} from "@/lib/create-safe-action";
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
import {RequestSchema} from "./schema";

export type InputType = z.infer<typeof RequestSchema>;

export type OutputType = {
    user: User;
    parents: ({
        user: User;
    } & Parent)[];
    classes: ({
        approvedAt: Date | null;
        rejectedAt: Date | null;
        unit: Unit;
        students: StudentsInClasses[];
        sessions: ({
            attendances: Attendance[];
        } & Session)[];
        tuitions: Tuition[];
    } & Class)[];
} & Student;

export type ReturnType = ActionState<InputType, OutputType>;
