import {z} from "zod";
import {PatchRequestPayloadSchema} from "./schema";

export type PatchRequestPayload = z.infer<typeof PatchRequestPayloadSchema>;

export type PatchResponsePayload = string;
