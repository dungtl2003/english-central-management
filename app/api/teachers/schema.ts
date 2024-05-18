import {z} from "zod";

const ROLE = ["TEACHER"] as const;

export const PostTeacherSchema = z.object({
    id: z
        .string({
            required_error: "ID is required",
            invalid_type_error: "ID must be a string",
            description: "ID of the teacher",
        })
        .min(1, "ID is too short"),
    firstName: z
        .string({
            required_error: "First name is required",
            invalid_type_error: "First name must be a string",
            description: "Fist name of the teacher",
        })
        .min(1, "First name is too short"),
    lastName: z
        .string({
            required_error: "Last name is required",
            invalid_type_error: "Last name must be a string",
            description: "Last name of the teacher",
        })
        .min(1, "Last name is too short"),
    role: z.enum(ROLE),
});

export type PostTeacher = z.infer<typeof PostTeacherSchema>;
