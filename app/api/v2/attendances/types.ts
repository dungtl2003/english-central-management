import {z} from "zod";
import {AttendanceSchema, PatchRequestPayloadSchema} from "./schema";

export type Attendance = z.infer<typeof AttendanceSchema>;

export type PatchRequestPayload = z.infer<typeof PatchRequestPayloadSchema>;

export type PatchResponsePayload = string;
