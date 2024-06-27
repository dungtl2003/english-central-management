import {z} from "zod";

export const RequestSchena = z.object({
    studentId: z.string(),
});
