import {UserRole} from "@prisma/client";
import {
    PatchTeacherWithAdminRoleSchema,
    PatchTeacherWithTeacherRoleSchema,
} from "../schema";

export const getPatchSchema = (role: UserRole) => {
    if (role === UserRole.ADMIN) {
        return PatchTeacherWithAdminRoleSchema;
    } else if (role === UserRole.TEACHER) {
        return PatchTeacherWithTeacherRoleSchema;
    }

    throw new Error("Unsupported role");
};
