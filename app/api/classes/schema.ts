import {z} from "zod";

const BaseQueryParamsSchema = z
    .object({
        teacherId: z.string({
            invalid_type_error: "Teacher ID must be a string",
            description: "Teacher ID of class",
        }),
        studentId: z.string({
            invalid_type_error: "Teacher ID must be a string",
            description: "Teacher ID of class",
        }),
    })
    .partial()
    .strict();

export const QueryParamsWithTeacherRoleSchema = BaseQueryParamsSchema.omit({
    studentId: true,
});

export const QueryParamsWithStudentRoleSchema = BaseQueryParamsSchema.omit({
    teacherId: true,
});

export const QueryParamsWithAdminRoleSchema = BaseQueryParamsSchema;

export type BaseQueryParams = z.infer<typeof BaseQueryParamsSchema>;
