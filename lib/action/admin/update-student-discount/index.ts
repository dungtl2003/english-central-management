import {ErrorResponsePayload} from "@/constaints";
import {InputType, OutputType, RequestPayload, ReturnType} from "./types";
import {PatchResponsePayload} from "@/app/api/v2/users/students/[studentId]/types";

export async function handler(data: InputType): Promise<ReturnType> {
    console.log("Timestamp: ", new Date().toLocaleString());
    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;
    const studentId = data.studentId;

    try {
        const requestPayload: RequestPayload = {
            discount: data.discount,
        };

        const url = `${protocol}://${domain}/api/v2/users/students/${studentId}`;
        const response = await fetch(url, {
            method: "PATCH",
            body: JSON.stringify(requestPayload),
        });

        const responsePayload = await response.json();
        if (response.status !== 200) {
            return {error: (<ErrorResponsePayload>responsePayload).error};
        }

        return {
            data: (<PatchResponsePayload>responsePayload) as OutputType,
        };
    } catch (error) {
        return {error: (<Error>error).message};
    }
}
