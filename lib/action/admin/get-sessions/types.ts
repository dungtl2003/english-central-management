import {ActionState} from "@/lib/create-safe-action";
import {User} from "@clerk/nextjs/server";
import {Class, Session, Teacher, Unit} from "@prisma/client";
import {z} from "zod";
import {RequestSchema} from "./schema";

export type OutputType = Session & {
    class: Class & {
        unit: Unit;
        teacher: Teacher & {
            user: User;
        };
    };
};

export type InputType = z.infer<typeof RequestSchema>;
export type ReturnType = ActionState<InputType, OutputType>;
