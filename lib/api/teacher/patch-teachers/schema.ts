import {z} from "zod";

export const RequestSchema = z.object({
    id: z.string(),
    firstName: z.string(),
    lastName: z
        .string({
            required_error: "Last name is required",
            invalid_type_error: "Last name must be a string",
            description: "Last name of the teacher",
        })
        .min(1, "Last name is too short"),
    phoneNumber: z
        .string({
            invalid_type_error: "Phone number must be a string",
            description: "Phone number of the teacher",
        })
        .min(9, "Phone number is too short"),
    identifyCard: z.string({
        invalid_type_error: "ID card must be a string",
        description: "ID card of the teacher",
    }),
    imageUrl: z.string({
        invalid_type_error: "Image URL must be a string",
        description: "Image URL of the teacher",
    }),
});
