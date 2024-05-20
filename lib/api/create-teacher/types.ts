import {z} from "zod";
import {TeacherRequestSchema} from "./schema";
import {ActionState} from "@/lib/create-safe-action";
import {Teacher, User} from "@prisma/client";

export interface TeacherResponseType extends User {
    teacher: Teacher;
}

export type InputType = z.infer<typeof TeacherRequestSchema>;
export type ReturnType = ActionState<InputType, TeacherResponseType>;
