import {z} from "zod";

export const PostSchema = z
    .object({
        classId: z.string({
            required_error: "ID is required",
            invalid_type_error: "ID must be a string",
            description: "ID of the class",
        }),
    })
    .required()
    .strict();

export type Post = z.infer<typeof PostSchema>;
