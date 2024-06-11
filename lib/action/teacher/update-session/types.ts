import {z} from "zod";
import {RequestSchema} from "./schema";
import {ActionState} from "@/lib/create-safe-action";
import {Session} from "@prisma/client";

export type InputType = z.infer<typeof RequestSchema>;

export type OutputType = Session;

export type ReturnType = ActionState<InputType, OutputType>;
