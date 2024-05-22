import {z} from "zod";

const BaseQueryParamsSchema = z
    .object({
        teacherId: z.string({
            invalid_type_error: "Teacher ID must be a string",
            description: "Teacher ID of class",
        }),
        studentId: z.string({
            invalid_type_error: "Teacher ID must be a string",
            description: "Teacher ID of class",
        }),
        grade: z.coerce
            .number({
                invalid_type_error: "Grade must be a number",
                description: "Grade of class",
            })
            .positive("Grade must be positive")
            .finite("Grade cannot be infinity")
            .int("Grade must be an integer"),
        year: z.coerce
            .number({
                invalid_type_error: "Year must be a number",
                description: "Year of class",
            })
            .positive("Year must be positive")
            .finite("Year cannot be infinity")
            .int("Year must be an integer"),
        price_per_session: z.coerce
            .number({
                invalid_type_error: "Price must be a number",
                description: "Price per session of class",
            })
            .nonnegative("Price cannot be negative")
            .finite("Price cannot be infinity")
            .int("Price must be an integer")
            .multipleOf(1000, "Price must be divisible by 1000"),
        startTime: z.string().datetime({
            message: "Invalid date time format",
        }),
        endTime: z.string().datetime({
            message: "Invalid date time format",
        }),
        startPeriod: z.string().datetime({
            message: "Invalid date time format",
        }),
        endPeriod: z.string().datetime({
            message: "Invalid date time format",
        }),
    })
    .partial()
    .strict();

export const QueryParamsWithTeacherRoleSchema = BaseQueryParamsSchema.omit({
    studentId: true,
});

export const QueryParamsWithStudentRoleSchema = BaseQueryParamsSchema.omit({
    teacherId: true,
});

export const QueryParamsWithAdminRoleSchema = BaseQueryParamsSchema;

export type BaseQueryParams = z.infer<typeof BaseQueryParamsSchema>;
