import {z} from "zod";

const ROLE = ["TEACHER"] as const;

export const PostTeacherSchema = z.object({
    first_name: z
        .string({
            required_error: "First name is required",
            invalid_type_error: "First name must be a string",
            description: "Fist name of the teacher",
        })
        .min(1, "First name is too short"),
    last_name: z
        .string({
            required_error: "Last name is required",
            invalid_type_error: "Last name must be a string",
            description: "Last name of the teacher",
        })
        .min(1, "Last name is too short"),
    role: z.enum(ROLE),
});
