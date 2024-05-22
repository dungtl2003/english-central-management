import {UserRole} from "@/constaints";
import {
    QueryParamsWithAdminRoleSchema,
    QueryParamsWithStudentRoleSchema,
    QueryParamsWithTeacherRoleSchema,
} from "./schema";

export function getSchemaByRole(role: string) {
    switch (role) {
        case UserRole.ADMIN:
            return QueryParamsWithAdminRoleSchema;
        case UserRole.TEACHER:
            return QueryParamsWithTeacherRoleSchema;
        case UserRole.STUDENT:
            return QueryParamsWithStudentRoleSchema;
        default:
            throw Error("Unsupported role");
    }
}

export function isRightPermission(
    role: string,
    clerkUserId: string,
    userIdParam?: string
): boolean {
    return (
        role === UserRole.ADMIN ||
        (role === UserRole.PARENT && !userIdParam) ||
        (role === UserRole.PARENT && userIdParam === clerkUserId) ||
        (role === UserRole.STUDENT && !userIdParam) ||
        (role === UserRole.STUDENT && userIdParam === clerkUserId)
    );
}
