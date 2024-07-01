import {z} from "zod";
import {RequestSchema} from "./schema";
import {
    Attendance,
    Class,
    Session,
    Student,
    StudentsInClasses,
    Unit,
    User,
} from "@prisma/client";
import {ActionState} from "@/lib/create-safe-action";

export type InputType = z.infer<typeof RequestSchema>;

export type OutputType = {
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

export type ReturnType = ActionState<InputType, OutputType>;
