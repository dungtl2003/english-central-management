import {z} from "zod";

export const PostSchema = z
    .object({
        year: z
            .number({
                required_error: "Year is required",
                invalid_type_error: "Year must be a number",
                description: "Year of the unit",
            })
            .min(1, "Invalid year")
            .max(9999, "Invalid year")
            .int("Year must be an integer"),
        grade: z
            .number({
                required_error: "Grade is required",
                invalid_type_error: "Grade must be a number",
                description: "Grade of the unit",
            })
            .nonnegative("Grade can't be negative")
            .int("Grade must be an integer")
            .finite("Grade must be a finite number"),
        maxSessions: z
            .number({
                required_error: "Max sessions is required",
                invalid_type_error: "Max sessions must be a number",
                description: "Maximum number of sessions of the unit",
            })
            .positive("Max sessions must be positive")
            .int("Max sessions must be an integer")
            .finite("Max sessions must be a finite number"),
        maxStudents: z
            .number({
                required_error: "Max students is required",
                invalid_type_error: "Max students must be a number",
                description: "Maximum number of students of the unit",
            })
            .positive("Max students must be positive")
            .int("Max students must be an integer")
            .finite("Max students must be a finite number"),
        studyHour: z
            .number({
                required_error: "Study hour is required",
                invalid_type_error: "Study hour must be a number",
                description: "Study hour of the unit",
            })
            .min(0, "Invalid study hour")
            .max(23, "Invalid study hour")
            .int("Study hour must be an integer"),
        studyMinute: z
            .number({
                required_error: "Study minute is required",
                invalid_type_error: "Study minute must be a number",
                description: "Study minute of the unit",
            })
            .min(0, "Invalid study minute")
            .max(59, "Invalid study minute")
            .int("Study minute must be an integer"),
        studySecond: z
            .number({
                required_error: "Study second is required",
                invalid_type_error: "Study second must be a number",
                description: "Study second of the unit",
            })
            .min(0, "Invalid study second")
            .max(59, "Invalid study second")
            .int("Study second must be an integer"),
        pricePerSession: z
            .number({
                required_error: "Price per session is required",
                invalid_type_error: "Price per session must be a number",
                description: "Price per session of the unit",
            })
            .nonnegative("Price per session can't be negative")
            .finite("Price per session must be a finite number"),
    })
    .required()
    .strict();

export type Post = z.infer<typeof PostSchema>;
