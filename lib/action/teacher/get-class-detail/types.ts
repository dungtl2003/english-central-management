import {z} from "zod";
import {RequestSchema} from "./schema";
import {ActionState} from "@/lib/create-safe-action";
import {
    Attendance,
    ChildrenParents,
    Class,
    Parent,
    Session,
    Student,
    StudentsInClasses,
    Tuition,
    Unit,
    User,
} from "@prisma/client";

export type InputType = z.infer<typeof RequestSchema>;

export type TotalPriceByMonthYear = {
    year: number;
    month: number;
    isPaid: boolean;
    totalPrice: number;
    attendances: number;
};

export type OutputType =
    | (Class & {
          unit: Unit;
          sessions: (Session & {
              attendances: (Attendance & {
                  student: Student & {
                      user: User;
                  };
              })[];
          })[];
          students: (StudentsInClasses & {
              student: Student & {
                  user: User;
                  tuitions: Tuition[];
                  parents: ({
                      parent: Parent & {
                          user: User;
                      };
                  } & ChildrenParents)[];
                  attendances: (Attendance & {
                      session: Session;
                  })[];
                  totalPriceByMonthYearList: TotalPriceByMonthYear[];
              };
          })[];
      })
    | null;

export type ReturnType = ActionState<InputType, OutputType>;
