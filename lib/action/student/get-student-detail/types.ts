import {ActionState} from "@/lib/create-safe-action";
import {Student, User} from "@prisma/client";

export type InputType = void;

export type OutputType = {
    student: Student;
} & User;

export type ReturnType = ActionState<InputType, OutputType>;
