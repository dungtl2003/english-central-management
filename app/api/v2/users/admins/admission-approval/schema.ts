import {z} from "zod";

export enum Action {
    APPROVE = "APPROVE",
    REJECT = "REJECT",
}

export const PatchRequestPayloadSchema = z
    .object({
        studentId: z.string({
            invalid_type_error: "Student ID must be a string",
            required_error: "Student ID is required",
            description: "ID of the student",
        }),
        classId: z.string({
            invalid_type_error: "Class ID must be a string",
            required_error: "Class ID is required",
            description: "ID of the class",
        }),
        action: z.nativeEnum(Action),
    })
    .strict()
    .required();
