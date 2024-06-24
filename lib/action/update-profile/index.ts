import {ErrorResponsePayload} from "@/constaints";
import {InputType, OutputType, ReturnType} from "./types";
import {PostResponsePayload} from "@/app/api/v2/users/[clerkUserId]/types";

export async function handler(data: InputType): Promise<ReturnType> {
    console.log("Timestamp: ", new Date().toLocaleString());

    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;

    try {
        const url = `${protocol}://${domain}/api/v2/users/${data.referUserId}`;
        console.log(`Sending POST request to ${url}`);
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data.unsafeMetadata),
        });

        const body = await response.json();
        if (response.status !== 200) {
            return {error: (<ErrorResponsePayload>body).error};
        }

        return {data: (<PostResponsePayload>body) as OutputType};
    } catch (error) {
        const msg = (<Error>error).message;
        console.error("Error:", msg);
        return {error: msg};
    }
}
