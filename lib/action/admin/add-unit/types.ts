import {z} from "zod";
import {PostRequestPayloadSchema, InputTypeSchema} from "./schema";
import {ActionState} from "@/lib/create-safe-action";

export type PostRequestPayload = z.infer<typeof PostRequestPayloadSchema>;
export type InputType = z.infer<typeof InputTypeSchema>;

export type OutputType = string;

export type ReturnType = ActionState<InputType, OutputType>;
