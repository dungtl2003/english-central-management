import {ErrorResponsePayload} from "@/constaints";
import {InputType, OutputType, ReturnType} from "./types";
import {AdminGetResponsePayload} from "@/app/api/v2/users/teachers/[teacherId]/types";

export async function handler(data: InputType): Promise<ReturnType> {
    console.log("Timestamp: ", new Date().toLocaleString());
    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;

    try {
        const getTeacherUrl = `${protocol}://${domain}/api/v2/users/teachers/${data.teacherId}`;
        console.log(`Sending GET request to ${getTeacherUrl}`);
        const getTeacherResponse = await fetch(getTeacherUrl, {
            method: "GET",
        });

        const getTeacherPayload = await getTeacherResponse.json();
        if (getTeacherResponse.status !== 200) {
            return {error: (<ErrorResponsePayload>getTeacherPayload).error};
        }

        return {
            data: (<AdminGetResponsePayload>getTeacherPayload) as OutputType,
        };
    } catch (error) {
        return {error: (<Error>error).message};
    }
}
