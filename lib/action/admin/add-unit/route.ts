import {ErrorResponsePayload} from "@/constaints";
import {InputType, OutputType, PostRequestPayload, ReturnType} from "./types";
import {PostResponsePayload} from "@/app/api/v2/units/types";

export async function handler(data: InputType): Promise<ReturnType> {
    console.log("Timestamp: ", new Date().toLocaleString());
    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;

    try {
        const addUnitUrl = `${protocol}://${domain}/api/v2/units`;
        const addUnitBody = {
            year: data.year,
            grade: data.grade,
            maxSessions: data.maxSessions,
            maxStudents: data.maxStudents,
            studyHour: data.studyHour,
            studyMinute: data.studyMinute,
            studySecond: 0,
            pricePerSession: data.pricePerSession,
        } as PostRequestPayload;

        console.log(`Sending POST request to ${addUnitUrl}`);
        const addUnitResponse = await fetch(addUnitUrl, {
            method: "POST",
            body: JSON.stringify(addUnitBody),
        });

        const addUnitResponsePayload = await addUnitResponse.json();
        if (addUnitResponse.status !== 200) {
            return {
                error: (<ErrorResponsePayload>addUnitResponsePayload).error,
            };
        }

        return {
            data: (<PostResponsePayload>addUnitResponsePayload) as OutputType,
        };
    } catch (error) {
        return {error: (<Error>error).message};
    }
}
