import {z} from "zod";

export enum Action {
    APPROVE = "APPROVE",
    REJECT = "REJECT",
}

export const RequestPayloadSchema = z.object({
    studentId: z.string(),
    classId: z.string(),
    action: z.nativeEnum(Action),
});
