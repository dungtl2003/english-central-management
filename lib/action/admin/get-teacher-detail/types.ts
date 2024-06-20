import {z} from "zod";
import {RequestSchena} from "./schema";
import {ActionState} from "@/lib/create-safe-action";
import {Class, MonthlyPayment, Teacher, Unit, User} from "@prisma/client";

export type InputType = z.infer<typeof RequestSchena>;

export type OutputType = Teacher & {
    user: User;
    classes: (Class & {
        unit: Unit;
    })[];
    monthlyPayments: MonthlyPayment[];
};
export type ReturnType = ActionState<InputType, OutputType>;
