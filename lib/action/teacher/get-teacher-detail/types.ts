import {z} from "zod";
import {RequestSchema} from "./schema";
import {ActionState} from "@/lib/create-safe-action";
import {Teacher, User} from "@prisma/client";

export type InputType = z.infer<typeof RequestSchema>;

export type OutputType = {
    user: User;
} & Teacher;

export type ReturnType = ActionState<InputType, OutputType>;
