import {z} from "zod";

export const RequestSchema = z.object({
    adminId: z.string(),
});
