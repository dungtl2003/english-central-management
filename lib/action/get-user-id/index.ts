import {GetResponsePayload} from "@/app/api/v2/users/types";
import {ErrorResponsePayload} from "@/constaints";
import {ReturnType} from "./types";

export const handler = async (): Promise<ReturnType> => {
    console.log("Timestamp: ", new Date().toLocaleString());

    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;

    try {
        const url = `${protocol}://${domain}/api/v2/users`;
        console.log(`Sending GET request to ${url}`);
        const response = await fetch(url, {
            method: "GET",
        });

        const body = await response.json();
        if (response.status !== 200) {
            return {error: (<ErrorResponsePayload>body).error};
        }

        return {data: (<GetResponsePayload>body) as string};
    } catch (error) {
        return {error: (<Error>error).message};
    }
};
