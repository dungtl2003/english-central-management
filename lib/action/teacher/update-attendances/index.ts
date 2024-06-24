import {ErrorResponsePayload} from "@/constaints";
import {InputType, OutputType, ReturnType} from "./types";
import {PatchResponsePayload} from "@/app/api/v2/attendances/types";

export const handler = async (data: InputType): Promise<ReturnType> => {
    console.log("Timestamp: ", new Date().toLocaleString());

    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;

    try {
        const url = `${protocol}://${domain}/api/v2/attendances`;
        console.log(`Sending PATCH request to ${url}`);

        const payload = {
            sessionId: data.sessionId,
            attendances: data.attendances,
        };

        const response = await fetch(url, {
            method: "PATCH",
            body: JSON.stringify(payload),
        });

        const body = await response.json();
        if (response.status !== 200) {
            return {error: (<ErrorResponsePayload>body).error};
        }

        return {data: (<PatchResponsePayload>body) as OutputType};
    } catch (error) {
        return {error: (<Error>error).message};
    }
};
