import {z} from "zod";

export const PatchRequestPayloadSchema = z
    .object({
        discount: z
            .number({
                invalid_type_error: "Discount must be a number",
                description: "Discount of the student",
            })
            .min(0, "Invalid discount")
            .max(100, "Invalid discount")
            .int("Discount must be an integer"),
    })
    .strict();
