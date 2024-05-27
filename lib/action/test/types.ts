import {z} from "zod";
import {TeacherSchema} from "./schema";
import {ActionState} from "@/lib/create-safe-action";

export type InputType = z.infer<typeof TeacherSchema>;
export type ReturnType = ActionState<InputType, InputType>;
