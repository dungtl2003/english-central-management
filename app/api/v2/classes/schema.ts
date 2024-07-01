import {z} from "zod";

const BaseGetQueryParamsSchema = z
    .object({
        teacherId: z.string({
            invalid_type_error: "Teacher ID must be a string",
            description: "Refer teacher ID of class",
        }),
    })
    .partial()
    .strict();

export const ScheduleSchema = z
    .object({
        dayOfWeek: z
            .number({
                required_error: "Day of week is required",
                invalid_type_error: "Day of week must be a number",
                description: "Day of week of the schedule",
            })
            .int("Day of week must be an integer")
            .gte(0, "Day of week must be between 0 and 6")
            .lte(6, "Day of week must be between 0 and 6"),
        startHour: z
            .number({
                required_error: "Start hour is required",
                invalid_type_error: "Start hour must be a number",
                description: "The start hour of the schedule",
            })
            .int("Start hour must be an integer")
            .gte(0, "Start hour must be between 0 and 23")
            .lte(23, "Start hour must be between 0 and 23"),
        startMinute: z
            .number({
                required_error: "Start minute is required",
                invalid_type_error: "Start minute must be a number",
                description: "The start minute of the schedule",
            })
            .int("Start minute must be an integer")
            .gte(0, "Start minute must be between 0 and 59")
            .lte(59, "Start minute must be between 0 and 59"),
        startSecond: z
            .number({
                required_error: "Start second is required",
                invalid_type_error: "Start second must be a number",
                description: "The start second of the schedule",
            })
            .int("Start second must be an integer")
            .gte(0, "Start second must be between 0 and 59")
            .lte(59, "Start second must be between 0 and 59"),
        location: z.string({
            required_error: "Location is required",
            invalid_type_error: "Location must be a string",
            description: "Location of the schedule",
        }),
    })
    .strict()
    .partial({
        location: true,
    });

export const PostRequestPayloadSchema = z
    .object({
        unitId: z.string({
            invalid_type_error: "Unit ID must be a string",
            required_error: "Unit ID is required",
            description: "Unit ID of class",
        }),
        teacherId: z.string({
            invalid_type_error: "Teacher ID must be a string",
            required_error: "Teacher ID is required",
            description: "Refer teacher ID of class",
        }),
        startDate: z.coerce.date({
            invalid_type_error: "Start date must be a date",
            required_error: "Start date is required",
            description: "Start date of class",
        }),
        timeZone: z
            .string({
                invalid_type_error: "Time zone must be a string",
                required_error: "Time zone is required",
                description: "Time zone of class",
            })
            .refine(
                () => Intl.supportedValuesOf("timeZone"),
                "Unknown time zone"
            ),
        schedules: z
            .array(ScheduleSchema)
            .min(1, "There must be at least 1 schedule"),
    })
    .strict();

export const AdminGetQueryParamsSchema = BaseGetQueryParamsSchema;
