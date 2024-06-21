import {Class, MonthlyPayment, Teacher, Unit, User} from "@prisma/client";
import {z} from "zod";
import {
    AdminDeleteRequestPayloadSchema,
    AdminPatchRequestPayloadSchema,
    TeacherPatchRequestPayloadSchema,
} from "./schema";

export type TeacherPatchRequestPayload = z.infer<
    typeof TeacherPatchRequestPayloadSchema
>;
export type AdminPatchRequestPayload = z.infer<
    typeof AdminPatchRequestPayloadSchema
>;

export type AdminDeleteRequestPayload = z.infer<
    typeof AdminDeleteRequestPayloadSchema
>;

export type TeacherGetResponsePayload =
    | ({
          user: User;
      } & Teacher)
    | null;
export type AdminGetResponsePayload =
    | ({
          user: User;
          classes: ({
              unit: Unit;
          } & Class)[];
          monthlyPayments: MonthlyPayment[];
      } & Teacher)
    | null;

export type TeacherPatchResponsePayload = string;
export type AdminPatchResponsePayload = string;

export type TeacherDeleteResponsePayload = string;
export type AdminDeleteResponsePayload = string;
