import {z} from "zod";

const BaseGetQueryParamsSchema = z
    .object({
        teacherId: z.string({
            invalid_type_error: "Teacher ID must be a string",
            description: "Refer teacher ID of class",
        }),
    })
    .partial()
    .strict();

export const AdminGetQueryParamsSchema = BaseGetQueryParamsSchema;
