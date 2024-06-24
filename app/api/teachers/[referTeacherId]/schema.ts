import {UserRole} from "@prisma/client";
import {z} from "zod";

const BasePatchSchema = z
    .object({
        baseSalary: z
            .number({
                invalid_type_error: "Base salary must be a number",
                description: "Base salary of the teacher",
            })
            .nonnegative("Base salary cannot be negative")
            .finite("Base salary cannot be infinity"),
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

export const PatchWithAdminRoleSchema = BasePatchSchema.pick({
    baseSalary: true,
});
export const PatchWithTeacherRoleSchema = BasePatchSchema.omit({
    baseSalary: true,
});

export type BasePatch = z.infer<typeof BasePatchSchema>;
export type PatchWithTeacherRole = z.infer<typeof PatchWithTeacherRoleSchema>;
export type PatchWithAdminRole = z.infer<typeof PatchWithAdminRoleSchema>;

export const getPatchSchemaByRole = (role: UserRole) => {
    switch (role) {
        case UserRole.ADMIN:
            return PatchWithAdminRoleSchema;
        case UserRole.TEACHER:
            return PatchWithTeacherRoleSchema;
        default:
            throw new Error("Unsupported role");
    }
};
