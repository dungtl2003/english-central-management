import {ErrorResponsePayload} from "@/constaints";
import {InputType, OutputType, ReturnType} from "./types";
import {DeleteResponsePayload} from "@/app/api/v2/users/students/[studentId]/types";

export async function handler(data: InputType): Promise<ReturnType> {
    console.log("Timestamp: ", new Date().toLocaleString());
    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;
    const studentId = data.studentId;

    try {
        const url = `${protocol}://${domain}/api/v2/users/students/${studentId}`;

        const res = await fetch(url, {
            method: "DELETE",
        });

        const body = await res.json();
        if (res.status !== 200) {
            return {error: (<ErrorResponsePayload>body).error};
        }

        return {data: (<DeleteResponsePayload>body) as OutputType};
    } catch (error) {
        return {error: (<Error>error).message};
    }
}
