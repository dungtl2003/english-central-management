import {z} from "zod";
import {
    AdminGetQueryParamsSchema,
    PostRequestPayloadSchema,
    ScheduleSchema,
} from "./schema";
import {Class, Unit} from "@prisma/client";

export type Schedule = z.infer<typeof ScheduleSchema>;

export type AdminGetQueryParams = z.infer<typeof AdminGetQueryParamsSchema>;

export type PostRequestPayload = z.infer<typeof PostRequestPayloadSchema>;

export type AdminGetResponsePayload = ({
    unit: Unit;
    numOfJoinedStudents: number;
    numOfPendingStudents: number;
} & Class)[];

export type PostResponsePayload = string;
