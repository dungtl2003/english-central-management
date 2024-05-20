import {containsNumber} from "@/lib/utils";
import {z} from "zod";

export const TeacherRequestSchema = z.object({
    id: z.string().nullable().optional(),
    firstName: z
        .string()
        .min(1, "First name must have at least 1 letter")
        .refine(
            (str) => !containsNumber(str),
            "First name should only contain letters"
        ),
    lastName: z
        .string()
        .min(1, "Last name must have at least 1 letter")
        .refine(
            (str) => !containsNumber(str),
            "Last name should only contain letters"
        ),
    role: z.string().min(1, {
        message: "You must have a role",
    }),
});
