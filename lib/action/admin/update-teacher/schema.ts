import {TeacherStatus} from "@prisma/client";
import {z} from "zod";

export const RequestSchena = z.object({
    teacherId: z.string(),
    baseSalary: z.number().optional(),
    status: z.nativeEnum(TeacherStatus).optional(),
    acceptedAt: z.date().optional(),
});
