import {ErrorResponsePayload} from "@/constaints";
import {InputType, OutputType, ReturnType} from "./types";
import {AdminGetResponsePayload} from "@/app/api/v2/classes/[classId]/types";

export async function handler(data: InputType): Promise<ReturnType> {
    console.log("Timestamp: ", new Date().toLocaleString());
    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;

    try {
        const getClassUrl = `${protocol}://${domain}/api/v2/classes/${data.classId}`;
        console.log(`Sending GET request to ${getClassUrl}`);
        const getClassResponse = await fetch(getClassUrl, {
            method: "GET",
        });

        const getClassPayload = await getClassResponse.json();
        if (getClassResponse.status !== 200) {
            return {error: (<ErrorResponsePayload>getClassPayload).error};
        }

        return {
            data: (<AdminGetResponsePayload>getClassPayload) as OutputType,
        };
    } catch (error) {
        return {error: (<Error>error).message};
    }
}
