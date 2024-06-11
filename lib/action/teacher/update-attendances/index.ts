import {ErrorType} from "../../generic";
import {InputType, OutputType, ReturnType} from "./types";

export const handler = async (data: InputType): Promise<ReturnType> => {
    console.log("Timestamp: ", new Date().toLocaleString());

    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;

    const url = `${protocol}://${domain}/api/attendances`;

    console.log(`Sending PATCH request to ${url}`);

    const payload = {
        sessionId: data.sessionId,
        attendances: data.attendances,
    };

    try {
        const response = await fetch(url, {
            method: "PATCH",
            body: JSON.stringify(payload),
        });

        const body = await response.json();
        console.log("Received: ", body);

        if (response.status !== 200) {
            return {error: (<ErrorType>body).error};
        }

        return {data: body as OutputType};
    } catch (error) {
        return {error: (<Error>error).message};
    }
};
