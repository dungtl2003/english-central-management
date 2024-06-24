import {z} from "zod";

const MonthlyPaymentSchema = z.object({
    salary: z
        .number({
            invalid_type_error: "Salary must be a number",
            description: "Payment's salary",
        })
        .min(0, "Salary cannot be negative"),
    year: z
        .number({
            invalid_type_error: "Year must be a number",
            description: "Payment's year",
        })
        .min(0, "Invalid year")
        .max(9999, "Invalid year"),
    month: z
        .number({
            invalid_type_error: "month must be a number",
            description: "Payment's month",
        })
        .min(0, "Invalid month")
        .max(11, "Invalid month"),
});

export const PostRequestPayloadSchema = z.object({
    teacherId: z.string({
        invalid_type_error: "Teacher ID must be a string",
        required_error: "Teacher ID is required",
        description: "Teacher ID",
    }),
    monthlyPayments: z.array(MonthlyPaymentSchema),
});
