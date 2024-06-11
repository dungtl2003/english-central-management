import {z} from "zod";
import {RequestSchema} from "./schema";
import {ActionState} from "@/lib/create-safe-action";

export type InputType = z.infer<typeof RequestSchema>;

export type OutputType = void;

export type ReturnType = ActionState<InputType, OutputType>;
