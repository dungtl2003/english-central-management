import {z} from "zod";

export const PatchSchema = z.object({
    actualTime: z.coerce.date({
        required_error: "Actual start time is required",
        description: "Actual start time of the session",
    }),
});

export type Patch = z.infer<typeof PatchSchema>;
