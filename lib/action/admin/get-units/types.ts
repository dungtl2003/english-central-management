import {ActionState} from "@/lib/create-safe-action";
import {Unit} from "@prisma/client";

export type InputType = void;

export type OutputType = Unit[];

export type ReturnType = ActionState<InputType, OutputType>;
