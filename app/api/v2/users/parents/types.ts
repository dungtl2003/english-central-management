import {z} from "zod";
import {PostRequestPayloadSchema} from "./schema";
import {Parent, User} from "@prisma/client";

export type PostRequestPayload = z.infer<typeof PostRequestPayloadSchema>;

export type ParentGetResponsePayload = {
    parent: Parent | null;
} & User;

export type AdminGetResponsePayload = ({
    user: User;
    numberOfChildren: number;
} & Parent)[];

export type PostResponsePayload = string;
