import {Student, User} from "@prisma/client";
import {z} from "zod";
import {PostRequestPayloadSchema} from "./schema";

export type PostRequestPayload = z.infer<typeof PostRequestPayloadSchema>;

export type GetResponsePayload = ({
    user: User;
    isRequesting: boolean;
} & Student)[];

export type PostResponsePayload = string;
