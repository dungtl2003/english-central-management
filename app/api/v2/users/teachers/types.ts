import {z} from "zod";
import {Teacher, User} from "@prisma/client";
import {PostRequestPayloadSchema, TeacherGetQueryParamsSchema} from "./schema";

export type TeacherGetQueryParams = z.infer<typeof TeacherGetQueryParamsSchema>;

export type PostRequestPayload = z.infer<typeof PostRequestPayloadSchema>;

export type AdminGetResponsePayload = ({
    user: User;
} & Teacher)[];
export type TeacherGetResponsePayload = ({
    user: User;
} & Teacher)[];
export type PostResponsePayload = string;
