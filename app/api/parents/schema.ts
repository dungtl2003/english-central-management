import {z} from "zod";

const HasId = z.object({
    id: z
        .string({
            required_error: "ID is required",
            invalid_type_error: "ID must be a string",
            description: "Refer ID of the parent",
        })
        .min(1, "ID is too short"),
});

export const PostSchema = HasId.strict();
export const DeleteSchema = HasId.strict();

export type Post = z.infer<typeof PostSchema>;
export type Delete = z.infer<typeof DeleteSchema>;
