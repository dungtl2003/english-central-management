import {z} from "zod";

export const RequestSchema = z.object({
    id: z.string(),
    baseSalary: z
        .number({
            invalid_type_error: "Base salary must be a number",
            description: "Base salary of the teacher",
        })
        .nonnegative("Base salary cannot be negative")
        .finite("Base salary cannot be infinity")
        .int("Base salary must be an integer")
        .multipleOf(1000, "Base salary must be divisible by 1000"),
});
