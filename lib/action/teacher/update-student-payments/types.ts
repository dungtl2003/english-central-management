import {z} from "zod";
import {PayloadSchema, PaymentSchema, RequestSchema} from "./schema";
import {ActionState} from "@/lib/create-safe-action";

export type Payment = z.infer<typeof PaymentSchema>;
export type Payload = z.infer<typeof PayloadSchema>;

export type InputType = z.infer<typeof RequestSchema>;
export type OutputType = string;

export type ReturnType = ActionState<InputType, OutputType>;
