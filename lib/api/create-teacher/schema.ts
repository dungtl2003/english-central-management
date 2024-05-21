import {z} from "zod";

export const TeacherRequestSchema = z.object({
    id: z.string().nullable().optional(),
    role: z.string().min(1, {
        message: "You must have a role",
    }),
});
