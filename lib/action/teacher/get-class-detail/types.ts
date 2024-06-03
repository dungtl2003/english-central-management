import {z} from "zod";
import {RequestSchema} from "./schema";
import {ActionState} from "@/lib/create-safe-action";
import {
    Attendance,
    Class,
    Session,
    Student,
    StudentsInClasses,
    Tuition,
    Unit,
    User,
} from "@prisma/client";

export type InputType = z.infer<typeof RequestSchema>;

export type OutputType =
    | (Class & {
          unit: Unit;
          sessions: Session[];
          students: (StudentsInClasses & {
              student: Student & {
                  user: User;
                  tuitions: Tuition;
                  attendances: Attendance;
              };
          })[];
      })
    | null;

export type ReturnType = ActionState<InputType, OutputType>;
