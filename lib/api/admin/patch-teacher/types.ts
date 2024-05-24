import {z} from "zod";
import {RequestSchema} from "./schema";
import {ActionState} from "@/lib/create-safe-action";
import {Teacher} from "@prisma/client";
import {User} from "@clerk/nextjs/server";

export type InputType = z.infer<typeof RequestSchema>;
type OutputTypeOfTeacher = Teacher & {user: User};
export type ReturnType = ActionState<InputType, OutputTypeOfTeacher>;
