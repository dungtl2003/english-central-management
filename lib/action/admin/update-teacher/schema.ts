import {TeacherStatus} from "@prisma/client";
import {z} from "zod";

export const RequestSchena = z.object({
    referAdminId: z.string(),
    teacherId: z.string(),
    baseSalary: z.number().optional(),
    status: z.nativeEnum(TeacherStatus).optional(),
    monthlyPayments: z
        .array(
            z.object({
                salary: z.number(),
                year: z.number(),
                month: z.number(),
            })
        )
        .optional(),
    acceptedAt: z.date().optional(),
    deletedAt: z.date().optional(),
});
