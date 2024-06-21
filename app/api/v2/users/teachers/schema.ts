import {z} from "zod";

const BaseGetQueryParamsSchema = z
    .object({
        referTeacherId: z.string({
            invalid_type_error: "Refer teacher ID must be a string",
            description: "Refer teacher ID",
        }),
    })
    .partial()
    .strict();
export const TeacherGetQueryParamsSchema = BaseGetQueryParamsSchema;

export const PostRequestPayloadSchema = z
    .object({
        id: z
            .string({
                required_error: "ID is required",
                invalid_type_error: "ID must be a string",
                description: "Refer ID of the teacher",
            })
            .min(1, "ID is too short"),
    })
    .strict();
