import {z} from "zod";
import {PostRequestPayloadSchema} from "./schema";
import {Unit} from "@prisma/client";

export type GetResponsePayload = Unit[];

export type PostResponsePayload = string;

export type PostRequestPayload = z.infer<typeof PostRequestPayloadSchema>;
