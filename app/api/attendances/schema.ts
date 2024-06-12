import {AttendanceStatus} from "@prisma/client";
import {z} from "zod";

const AttendanceSchema = z
    .object({
        attendanceId: z.string({
            invalid_type_error: "Attendance ID must be a string",
            required_error: "Attendance ID is required",
            description: "ID of the attendance",
        }),
        description: z
            .string({
                invalid_type_error: "Description must be a string",
                description: "Description of the attendance",
            })
            .nullable(),
        status: z.nativeEnum(AttendanceStatus, {
            invalid_type_error:
                "Status must be either `PRESENT`, `ABSENT` or `LATE`",
            required_error: "Status is required",
            description: "Attendance's status",
        }),
    })
    .strict();

export const PatchSchema = z.object({
    sessionId: z.string({
        invalid_type_error: "Session ID must be a string",
        required_error: "Session ID is required",
        description: "ID of the session",
    }),
    attendances: z.array(AttendanceSchema),
});

export type Attendance = z.infer<typeof AttendanceSchema>;
export type Patch = z.infer<typeof PatchSchema>;
