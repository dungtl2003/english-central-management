import {ActionState} from "@/lib/create-safe-action";
import {Parent, Student, Tuition, User} from "@prisma/client";
import {z} from "zod";
import {RequestSchema} from "./schema";

export type InputType = z.infer<typeof RequestSchema>;

export type OutputType = {
    user: User;
    children: ({
        user: User;
        tuitions: Tuition[];
    } & Student)[];
} & Parent;

export type ReturnType = ActionState<InputType, OutputType>;
