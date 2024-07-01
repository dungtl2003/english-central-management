import {ErrorResponsePayload} from "@/constaints";
import {OutputType, ReturnType} from "./types";
import {StudentGetResponsePayload} from "@/app/api/v2/users/students/types";

export const handler = async (): Promise<ReturnType> => {
    console.log("Timestamp: ", new Date().toLocaleString());

    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;

    try {
        const getStudentUrl = `${protocol}://${domain}/api/v2/users/students`;
        console.log(`Sending GET request to ${getStudentUrl}`);
        const getStudentResponse = await fetch(getStudentUrl, {
            method: "GET",
        });

        const getStudentPayload = await getStudentResponse.json();
        if (getStudentResponse.status !== 200) {
            return {error: (<ErrorResponsePayload>getStudentPayload).error};
        }

        return {
            data: (<StudentGetResponsePayload>getStudentPayload) as OutputType,
        };
    } catch (error) {
        return {error: (<Error>error).message};
    }
};
