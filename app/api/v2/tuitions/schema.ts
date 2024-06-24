import {z} from "zod";

export const PaymentSchema = z.object({
    year: z
        .number({
            required_error: "Year is required",
            invalid_type_error: "Year must be a number",
            description: "Year of the payment",
        })
        .min(1, "Invalid year")
        .max(9999, "Invalid year")
        .int("Year must be an integer"),
    month: z
        .number({
            required_error: "Month is required",
            invalid_type_error: "Month must be a number",
            description: "Month of the payment",
        })
        .min(0, "Invalid month")
        .max(11, "Invalid month")
        .int("Month must be an integer"),
    amount: z
        .number({
            required_error: "Amount is required",
            invalid_type_error: "Amount must be a number",
            description: "Amount of the payment",
        })
        .nonnegative("Amount cannot be negative")
        .finite("Invalid amount"),
});

export const PostRequestPayloadSchema = z.object({
    studentId: z
        .string({
            required_error: "Student ID is required",
            invalid_type_error: "Student ID must be a string",
            description: "ID of the student",
        })
        .min(1, "ID is too short"),
    parentId: z
        .string({
            required_error: "Parent ID is required",
            invalid_type_error: "Parent ID must be a string",
            description: "ID of the parent",
        })
        .min(1, "ID is too short"),
    classId: z
        .string({
            required_error: "Class ID is required",
            invalid_type_error: "Class ID must be a string",
            description: "ID of the class",
        })
        .min(1, "ID is too short"),
    discount: z
        .number({
            required_error: "Discount is required",
            invalid_type_error: "Discount must be a number",
            description: "Discount of the payment",
        })
        .min(0, "Discount must be between 0 and 100")
        .max(100, "Discount must be between 0 and 100")
        .int("Discount must be an integer"),
    payments: z.array(PaymentSchema),
});
