import {ErrorResponsePayload} from "@/constaints";
import {InputType, OutputType, ReturnType} from "./types";
import {AdminGetResponsePayload} from "@/app/api/v2/users/parents/[parentId]/types";

export async function handler(data: InputType): Promise<ReturnType> {
    console.log("Timestamp: ", new Date().toLocaleString());
    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;

    try {
        const getParentUrl = `${protocol}://${domain}/api/v2/users/parents/${data.parentId}`;
        console.log(`Sending GET request to ${getParentUrl}`);
        const getParentResponse = await fetch(getParentUrl, {
            method: "GET",
        });

        const getParentPayload = await getParentResponse.json();
        if (getParentResponse.status !== 200) {
            return {error: (<ErrorResponsePayload>getParentPayload).error};
        }

        return {
            data: (<AdminGetResponsePayload>getParentPayload) as OutputType,
        };
    } catch (error) {
        return {error: (<Error>error).message};
    }
}
