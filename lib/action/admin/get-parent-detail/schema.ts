import {z} from "zod";

export const RequestSchema = z.object({
    parentId: z.string(),
});
