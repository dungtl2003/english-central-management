import {ActionState} from "@/lib/create-safe-action";
import {Teacher, User} from "@prisma/client";

export type OutputType = (Teacher & {
    user: User;
})[];

export type ReturnType = ActionState<void, OutputType>;
