import {UserRole} from "@prisma/client";
import {z} from "zod";

const BaseQueryParamsSchema = z
    .object({
        teacherId: z.string({
            invalid_type_error: "Teacher ID must be a string",
            description: "Teacher ID of class",
        }),
    })
    .partial()
    .strict();

export const QueryParamsWithTeacherRoleSchema = BaseQueryParamsSchema;
export const QueryParamsWithStudentRoleSchema = BaseQueryParamsSchema.omit({
    teacherId: true,
});
export const QueryParamsWithAdminRoleSchema = BaseQueryParamsSchema.omit({
    teacherId: true,
});
export const QueryParamsWithParentRoleSchema = BaseQueryParamsSchema.omit({
    teacherId: true,
});

export type BaseQueryParams = z.infer<typeof BaseQueryParamsSchema>;

export function getSchemaByRole(role: string) {
    switch (role) {
        case UserRole.ADMIN:
            return QueryParamsWithAdminRoleSchema;
        case UserRole.TEACHER:
            return QueryParamsWithTeacherRoleSchema;
        case UserRole.STUDENT:
            return QueryParamsWithStudentRoleSchema;
        case UserRole.PARENT:
            return QueryParamsWithParentRoleSchema;
        default:
            throw Error("Unsupported role");
    }
}
