import {z} from "zod";

export const RequestSchena = z.object({
    teacherId: z.string(),
});
