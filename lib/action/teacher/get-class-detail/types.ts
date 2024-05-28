import {z} from "zod";
import {RequestSchema} from "./schema";
import {ActionState} from "@/lib/create-safe-action";
import {
    Attendance,
    Class,
    Student,
    StudentsInClasses,
    Unit,
    User,
} from "@prisma/client";

export type InputType = z.infer<typeof RequestSchema>;

export type OutputType =
    | (Class & {
          unit: Unit;
          attendances: Attendance[];
          students: (StudentsInClasses & {
              student: Student & {
                  user: User;
              };
          })[];
      })
    | null;

export type ReturnType = ActionState<InputType, OutputType>;
