import {z} from "zod";
import {PostRequestPayloadSchema} from "./schema";

export type PostRequestPayload = z.infer<typeof PostRequestPayloadSchema>;

export type PostResponsePayload = string;
