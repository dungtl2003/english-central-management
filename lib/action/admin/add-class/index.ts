import {ErrorResponsePayload} from "@/constaints";
import {InputType, OutputType, ReturnType} from "./types";
import {PostResponsePayload} from "@/app/api/v2/classes/types";
import {Schedule} from "@prisma/client";

export async function handler(data: InputType): Promise<ReturnType> {
    console.log("Timestamp: ", new Date().toLocaleString());
    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;

    try {
        const addClassUrl = `${protocol}://${domain}/api/v2/classes`;
        const addClassBody = {
            teacherId: data.teacherId,
            unitId: data.unitId,
            startDate: data.startDate,
            timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
            schedules: data.schedules.map((s) => {
                return {
                    dayOfWeek: s.dayOfWeek,
                    startHour: s.startHour,
                    startMinute: s.startMinute,
                    startSecond: 0,
                    location: s.location,
                } as Schedule;
            }),
        };

        console.log(`Sending POST request to ${addClassUrl}`);
        const addClassResponse = await fetch(addClassUrl, {
            method: "POST",
            body: JSON.stringify(addClassBody),
        });

        const addClassResponsePayload = await addClassResponse.json();
        if (addClassResponse.status !== 200) {
            return {
                error: (<ErrorResponsePayload>addClassResponsePayload).error,
            };
        }

        return {
            data: (<PostResponsePayload>addClassResponsePayload) as OutputType,
        };
    } catch (error) {
        return {error: (<Error>error).message};
    }
}
