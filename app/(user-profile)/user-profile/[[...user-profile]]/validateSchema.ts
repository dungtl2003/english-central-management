import {z} from "zod";

export const PhoneNumberSchema = z
    .string()
    .refine((value) => value.startsWith("0"), {
        message: "Phone number must start with 0",
    })
    .refine((value) => /^\d+$/.test(value), {
        message: "Phone number must only contain number",
    })
    .refine((value) => value.length === 10, {
        message: "Phone number must be 10 characters",
    });

export const IdentityCardSchema = z
    .string()
    .refine((value) => /^\d+$/.test(value), {
        message: "Identity card must only contain digits",
    })
    .refine((value) => value.length === 12, {
        message: "Identity card must be 12 characters",
    });

export const BirthdaySchema = z.date().refine((value) => value < new Date(), {
    message: "Birthday must be in the past",
});
