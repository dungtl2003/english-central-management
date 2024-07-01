import {z} from "zod";
import {RequestPayloadSchema} from "./schema";
import {ActionState} from "@/lib/create-safe-action";

export type RequestPayload = z.infer<typeof RequestPayloadSchema>;
export type InputType = z.infer<typeof RequestPayloadSchema>;
export type OutputType = string;
export type ReturnType = ActionState<InputType, OutputType>;
