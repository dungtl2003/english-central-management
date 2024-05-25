import {z} from "zod";
import {RequestSchema} from "./schema";
import {ActionState} from "@/lib/create-safe-action";
import {Class, Unit, User} from "@prisma/client";

export type InputType = z.infer<typeof RequestSchema>;
export type OutputType = {
    className: string;
    teacher: string;
    year: string;
    start: string;
    end: string;
    price: string;
};

export type ResponseType = (Class & {
    unit: Unit;
    teacher: {
        user: User;
    };
})[];

export type ReturnType = ActionState<InputType, OutputType[]>;
