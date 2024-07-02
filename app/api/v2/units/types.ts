import {z} from "zod";
import {PostRequestPayloadSchema} from "./schema";
import {Class, Unit} from "@prisma/client";

export type GetResponsePayload = (Unit & {
    classes: Class[];
})[];

export type PostResponsePayload = string;

export type PostRequestPayload = z.infer<typeof PostRequestPayloadSchema>;
