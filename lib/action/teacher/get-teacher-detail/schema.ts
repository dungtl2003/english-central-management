import {z} from "zod";

export const RequestSchema = z.object({
    referTeacherId: z.string(),
});
