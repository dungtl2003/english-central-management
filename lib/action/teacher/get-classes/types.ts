import {z} from "zod";
import {RequestSchema} from "./schema";
import {ActionState} from "@/lib/create-safe-action";
import {Class, Unit, User} from "@prisma/client";

export type InputType = z.infer<typeof RequestSchema>;

export type OutputType = (Class & {
    unit: Unit;
    teacher: {
        user: User;
    };
})[];

export type ReturnType = ActionState<InputType, OutputType>;
