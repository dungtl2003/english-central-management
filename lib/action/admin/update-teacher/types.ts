import {z} from "zod";
import {RequestSchena} from "./schema";
import {ActionState} from "@/lib/create-safe-action";
import {MonthlyPayment, Teacher, User} from "@prisma/client";

export type InputType = z.infer<typeof RequestSchena>;

export type OutputType = Teacher & {
    user: User;
    monthlyPayments: MonthlyPayment[];
};

export type ReturnType = ActionState<InputType, OutputType>;
