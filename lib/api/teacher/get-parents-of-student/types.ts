import {z} from "zod";
import {RequestSchema} from "./schema";
import {ActionState} from "@/lib/create-safe-action";
import {ChildrenParents, Parent, User} from "@prisma/client";

export type InputType = z.infer<typeof RequestSchema>;
type OutputTypeOfParentsOfStudent = ChildrenParents &
    {
        parent: Parent & User;
    }[];
export type ReturnType = ActionState<InputType, OutputTypeOfParentsOfStudent>;
