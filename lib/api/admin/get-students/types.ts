import {z} from "zod";
import {RequestSchema} from "./schema";
import {Student, User} from "@prisma/client";
import {ActionState} from "@/lib/create-safe-action";

export type InputType = z.infer<typeof RequestSchema>;
type OutputTypeOfStudents = (Student & {
    user: User;
})[];
export type ReturnType = ActionState<InputType, OutputTypeOfStudents>;
