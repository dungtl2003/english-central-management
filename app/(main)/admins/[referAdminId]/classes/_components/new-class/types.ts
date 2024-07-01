import {z} from "zod";

export const ClassBasicInfoSchema = z.object({
    unitId: z.string(), //need
    teacherId: z.string(), //need
    pricePerSession: z.string(),
    maxSessions: z.string(),
    maxStudents: z.string(),
    studyTime: z.object({
        hours: z.string(),
        minutes: z.string(),
        seconds: z.string(),
    }),
    startDate: z.string(), //need
});

export const ClassScheduleSchema = z.object({
    schedule: z.array(
        z.object({
            dayOfWeek: z.string(),
            startHour: z.number(),
            startMinute: z.number(),
            startSecond: z.number(),
        })
    ),
});

export const FormSchema = ClassBasicInfoSchema.merge(ClassScheduleSchema);

export type ClassBasicInfoType = z.infer<typeof ClassBasicInfoSchema>;

export type ClassScheduleType = z.infer<typeof ClassScheduleSchema>;

export type FormType = z.infer<typeof FormSchema>;

export enum ClassStatus {
    WAITING = "Waiting",
    ACTIVE = "Active",
    CLOSED = "Closed",
}
