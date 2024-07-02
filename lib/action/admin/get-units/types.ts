import {ActionState} from "@/lib/create-safe-action";
import {Class, Unit} from "@prisma/client";

export type InputType = void;

export type OutputType = (Unit & {
    classes: Class[];
})[];

export type ReturnType = ActionState<InputType, OutputType>;
