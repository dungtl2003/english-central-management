import {z} from "zod";

export const PostRequestPayloadSchema = z
    .object({
        id: z
            .string({
                required_error: "ID is required",
                invalid_type_error: "ID must be a string",
                description: "Refer ID of the parent",
            })
            .min(1, "ID is too short"),
    })
    .strict();
