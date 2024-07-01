import {Student, User} from "@prisma/client";
import {z} from "zod";
import {PostRequestPayloadSchema} from "./schema";

export type StudentGetResponsePayload = {
    student: Student | null;
} & User;

export type AdminGetResponsePayload = ({
    user: User;
    isRequesting: boolean;
} & Student)[];

export type PostRequestPayload = z.infer<typeof PostRequestPayloadSchema>;

export type PostResponsePayload = string;
