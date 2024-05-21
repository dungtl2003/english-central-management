import {z} from "zod";

const ROLE = ["TEACHER"] as const;

export const PostTeacherSchema = z
    .object({
        id: z
            .string({
                required_error: "ID is required",
                invalid_type_error: "ID must be a string",
                description: "ID of the teacher",
            })
            .min(1, "ID is too short"),
        role: z.enum(ROLE),
    })
    .strict();

export const PatchTeacherWithAdminRoleSchema = z
    .object({
        baseSalary: z
            .number({
                invalid_type_error: "Base salary must be a number",
                description: "Base salary of the teacher",
            })
            .nonnegative("Base salary cannot be negative")
            .finite("Base salary cannot be infinity")
            .int("Base salary must be an integer")
            .multipleOf(1000, "Base salary must be divisible by 1000"),
    })
    .partial()
    .strict();

export const PatchTeacherWithTeacherRoleSchema = z
    .object({
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
        phoneNumber: z
            .string({
                invalid_type_error: "Phone number must be a string",
                description: "Phone number of the teacher",
            })
            .min(9, "Phone number is too short"),
        identifyCard: z.string({
            invalid_type_error: "ID card must be a string",
            description: "ID card of the teacher",
        }),
        imageUrl: z.string({
            invalid_type_error: "Image URL must be a string",
            description: "Image URL of the teacher",
        }),
    })
    .partial()
    .strict();

export type PostTeacher = z.infer<typeof PostTeacherSchema>;
export type PatchTeacherWithTeacherRole = z.infer<
    typeof PatchTeacherWithTeacherRoleSchema
>;
export type PatchTeacherWithAdminRole = z.infer<
    typeof PatchTeacherWithAdminRoleSchema
>;
