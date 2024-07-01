import {ErrorResponsePayload} from "@/constaints";
import {OutputType, ReturnType} from "./types";
import {AdminGetResponsePayload} from "@/app/api/v2/classes/types";

export async function handler(): Promise<ReturnType> {
    console.log("Timestamp: ", new Date().toLocaleString());
    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;

    try {
        const getClassesUrl = `${protocol}://${domain}/api/v2/classes`;
        console.log(`Sending GET request to ${getClassesUrl}`);
        const getClassesResponse = await fetch(getClassesUrl, {
            method: "GET",
        });

        const getClassesPayload = await getClassesResponse.json();
        if (getClassesResponse.status !== 200) {
            return {error: (<ErrorResponsePayload>getClassesPayload).error};
        }

        return {
            data: (<AdminGetResponsePayload>getClassesPayload) as OutputType,
        };
    } catch (error) {
        return {error: (<Error>error).message};
    }
}
