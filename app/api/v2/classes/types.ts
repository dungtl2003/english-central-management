import {z} from "zod";
import {AdminGetQueryParamsSchema} from "./schema";
import {Class} from "@prisma/client";

export type AdminGetQueryParams = z.infer<typeof AdminGetQueryParamsSchema>;

export type AdminGetResponsePayload = Class[];
