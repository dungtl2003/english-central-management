import {UserRole} from "@prisma/client";
import {z} from "zod";

const HasId = z.object({
    id: z
        .string({
            required_error: "ID is required",
            invalid_type_error: "ID must be a string",
            description: "ID of the student",
        })
        .min(1, "ID is too short"),
});

const BasePatchSchema = z
    .object({
        discount: z
            .number({
                invalid_type_error: "Discount must be a number",
                description: "Discount of the student",
            })
            .int("Discount must be an integer")
            .min(0, "Discount must be atleast 0")
            .max(100, "Discount cannot higher than 100%"),
        firstName: z
            .string({
                required_error: "First name is required",
                invalid_type_error: "First name must be a string",
                description: "Fist name of the student",
            })
            .min(1, "First name is too short"),
        lastName: z
            .string({
                required_error: "Last name is required",
                invalid_type_error: "Last name must be a string",
                description: "Last name of the student",
            })
            .min(1, "Last name is too short"),
        phoneNumber: z
            .string({
                invalid_type_error: "Phone number must be a string",
                description: "Phone number of the student",
            })
            .min(9, "Phone number is too short"),
        identifyCard: z.string({
            invalid_type_error: "ID card must be a string",
            description: "ID card of the student",
        }),
        imageUrl: z.string({
            invalid_type_error: "Image URL must be a string",
            description: "Image URL of the student",
        }),
    })
    .partial()
    .strict();

export const PostSchema = HasId.strict();
export const DeleteSchema = HasId.strict();
export const PatchWithAdminRoleSchema = BasePatchSchema.pick({
    discount: true,
});
export const PatchWithStudentRoleSchema = BasePatchSchema.omit({
    discount: true,
});

export type Post = z.infer<typeof PostSchema>;
export type Delete = z.infer<typeof DeleteSchema>;
export type BasePatch = z.infer<typeof BasePatchSchema>;
export type PatchWithStudentRole = z.infer<typeof PatchWithStudentRoleSchema>;
export type PatchWithAdminRole = z.infer<typeof PatchWithAdminRoleSchema>;

export const getPatchSchemaByRole = (role: UserRole) => {
    switch (role) {
        case UserRole.ADMIN:
            return PatchWithAdminRoleSchema;
        case UserRole.STUDENT:
            return PatchWithStudentRoleSchema;
        default:
            throw new Error("Unsupported role");
    }
};
