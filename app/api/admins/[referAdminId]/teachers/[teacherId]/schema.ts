import {TeacherStatus} from "@prisma/client";
import {z} from "zod";

export const BasePatchSchema = z
    .object({
        baseSalary: z
            .number({
                invalid_type_error: "Base salary must be a number",
                description: "Base salary of the teacher",
            })
            .nonnegative("Base salary cannot be negative")
            .finite("Base salary cannot be infinity"),
        status: z.nativeEnum(TeacherStatus, {
            invalid_type_error:
                'Status must be "TEACHING"|"AVAILABLE"|"DELETED"|"PENDING"',
            description: "Status of the teacher",
        }),
        acceptedAt: z.string().transform((value) => {
            const parsedDate = new Date(value);
            return parsedDate;
        }),
        deletedAt: z.string().transform((value) => {
            const parsedDate = new Date(value);
            return parsedDate;
        }),
        monthlyPayments: z.array(
            z.object({
                salary: z.number(),
                year: z.number(),
                month: z.number(),
            }),
            {
                invalid_type_error: "Salary, year and month must be numbers",
                description: "List monthly payment of the teacher",
            }
        ),
    })
    .partial()
    .strict();

export type BasePatch = z.infer<typeof BasePatchSchema>;
