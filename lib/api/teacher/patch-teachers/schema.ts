import {PatchWithTeacherRoleSchema} from "@/app/api/teachers/schema";
import {UserRole} from "@prisma/client";
import {z} from "zod";

export const RequestSchema = z
    .object({
        id: z.string(),
    })
    .merge(PatchWithTeacherRoleSchema)
    .extend({
        role: z.enum(Object.values(UserRole) as [string, ...string[]]),
    });
