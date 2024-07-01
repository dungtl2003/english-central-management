import {ErrorResponsePayload} from "@/constaints";
import {OutputType, ReturnType} from "./types";
import {AdminGetResponsePayload} from "@/app/api/v2/users/parents/types";

export async function handler(): Promise<ReturnType> {
    console.log("Timestamp: ", new Date().toLocaleString());

    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;

    const url = `${protocol}://${domain}/api/v2/users/parents`;

    console.log(`Sending GET request to ${url}`);

    try {
        const response = await fetch(url, {
            method: "GET",
        });

        const body = await response.json();

        if (response.status !== 200) {
            return {error: (<ErrorResponsePayload>body).error};
        }

        const data = (<AdminGetResponsePayload>body) as OutputType;
        return {data: data};
    } catch (error) {
        const msg = (<Error>error).message;
        console.error("Error:", msg);
        return {error: msg};
    }
}
