import {ErrorResponsePayload} from "@/constaints";
import {OutputType, ReturnType} from "./types";
import {ParentGetResponsePayload} from "@/app/api/v2/users/parents/types";

export const handler = async (): Promise<ReturnType> => {
    console.log("Timestamp: ", new Date().toLocaleString());

    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;

    try {
        const getParentUrl = `${protocol}://${domain}/api/v2/users/parents`;
        console.log(`Sending GET request to ${getParentUrl}`);
        const getParentResponse = await fetch(getParentUrl, {
            method: "GET",
        });

        const getParentPayload = await getParentResponse.json();
        if (getParentResponse.status !== 200) {
            return {error: (<ErrorResponsePayload>getParentPayload).error};
        }

        return {
            data: (<ParentGetResponsePayload>getParentPayload) as OutputType,
        };
    } catch (error) {
        return {error: (<Error>error).message};
    }
};
