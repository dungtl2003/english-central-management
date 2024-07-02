import {ActionState} from "@/lib/create-safe-action";
import {Parent, User} from "@prisma/client";

export type InputType = void;

export type OutputType = {
    parent: Parent;
} & User;

export type ReturnType = ActionState<InputType, OutputType>;
