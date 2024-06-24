import {TeacherStatus} from "@prisma/client";
import {z} from "zod";

export const RequestSchena = z.object({
    teacherId: z.string(),
    status: z.nativeEnum(TeacherStatus).optional(),
});
