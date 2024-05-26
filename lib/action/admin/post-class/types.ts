import {z} from "zod";
import {RequestSchema} from "./schema";
import {Class, Unit, User} from "@prisma/client";
import {ActionState} from "@/lib/create-safe-action";

export type InputType = z.infer<typeof RequestSchema>;
type OutputTypeOfClass = Class & {
    unit: Unit;
    teacher: {
        user: User;
    };
};
export type ReturnType = ActionState<InputType, OutputTypeOfClass>;
