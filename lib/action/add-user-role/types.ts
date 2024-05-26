import {z} from "zod";
import {RequestSchema} from "./schema";
import {ActionState} from "@/lib/create-safe-action";

export interface Body {
    id: string;
}
export type InputType = z.infer<typeof RequestSchema>;
export type ReturnType = ActionState<InputType, string>;
