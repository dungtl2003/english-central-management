import {z} from "zod";
import {RequestSchena} from "./schema";
import {ActionState} from "@/lib/create-safe-action";

export type InputType = z.infer<typeof RequestSchena>;

export type OutputType = string;

export type ReturnType = ActionState<InputType, OutputType>;
