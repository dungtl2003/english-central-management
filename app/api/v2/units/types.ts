import {z} from "zod";
import {PostRequestPayloadSchema} from "./schema";

export type PostResponsePayload = string;

export type PostRequestPayload = z.infer<typeof PostRequestPayloadSchema>;
