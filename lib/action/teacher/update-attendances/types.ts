import {z} from "zod";
import {AttendanceSchema, RequestSchema} from "./schema";
import {ActionState} from "@/lib/create-safe-action";

export type Attendances = z.infer<typeof AttendanceSchema>;

export type InputType = z.infer<typeof RequestSchema>;

export type OutputType = string;

export type ReturnType = ActionState<InputType, OutputType>;
