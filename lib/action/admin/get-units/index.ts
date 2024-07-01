import {ErrorResponsePayload} from "@/constaints";
import {OutputType, ReturnType} from "./types";
import {GetResponsePayload} from "@/app/api/v2/units/types";

export async function handler(): Promise<ReturnType> {
    console.log("Timestamp: ", new Date().toLocaleString());
    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;

    try {
        const getUnitsUrl = `${protocol}://${domain}/api/v2/units`;
        console.log(`Sending GET request to ${getUnitsUrl}`);
        const getUnitsResponse = await fetch(getUnitsUrl, {
            method: "GET",
        });

        const getUnitsPayload = await getUnitsResponse.json();
        if (getUnitsResponse.status !== 200) {
            return {error: (<ErrorResponsePayload>getUnitsPayload).error};
        }

        return {
            data: (<GetResponsePayload>getUnitsPayload) as OutputType,
        };
    } catch (error) {
        return {error: (<Error>error).message};
    }
}
