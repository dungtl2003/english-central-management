import {TeacherStatus} from "@prisma/client";
import {z} from "zod";

const BasePatchRequestPayloadSchema = z
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
        status: z.nativeEnum(TeacherStatus),
        acceptedAt: z.string().transform((value) => {
            const parsedDate = new Date(value);
            return parsedDate;
        }),
    })
    .partial()
    .strict();

export const AdminDeleteRequestPayloadSchema = z
    .object({
        status: z.nativeEnum(TeacherStatus),
    })
    .strict();

export const AdminPatchRequestPayloadSchema =
    BasePatchRequestPayloadSchema.pick({
        baseSalary: true,
        status: true,
        acceptedAt: true,
    });
export const TeacherPatchRequestPayloadSchema =
    BasePatchRequestPayloadSchema.omit({
        baseSalary: true,
        status: true,
        acceptedAt: true,
    });
