import {z} from "zod";
import {RequestSchema} from "./schema";
import {Parent, User} from "@prisma/client";
import {ActionState} from "@/lib/create-safe-action";

export type InputType = z.infer<typeof RequestSchema>;
type OutputTypeOfParents = (Parent & {
    user: User;
})[];
export type ReturnType = ActionState<InputType, OutputTypeOfParents>;
