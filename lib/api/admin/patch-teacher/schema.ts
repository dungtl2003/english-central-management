import {PatchWithAdminRoleSchema} from "@/app/api/teachers/schema";
import {z} from "zod";

export const RequestSchema = z
    .object({
        teacherId: z.string(),
    })
    .merge(PatchWithAdminRoleSchema);
