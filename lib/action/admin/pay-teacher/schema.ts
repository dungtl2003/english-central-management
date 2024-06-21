import {z} from "zod";

export const RequestSchena = z.object({
    teacherId: z.string(),
    monthlyPayments: z
        .array(
            z.object({
                salary: z.number(),
                year: z.number(),
                month: z.number(),
            })
        )
        .optional(),
});
