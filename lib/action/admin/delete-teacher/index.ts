import {ErrorResponsePayload} from "@/constaints";
import {InputType, OutputType, ReturnType} from "./types";
import {AdminDeleteResponsePayload} from "@/app/api/v2/users/teachers/[teacherId]/types";

export async function handler(data: InputType): Promise<ReturnType> {
    console.log("Timestamp: ", new Date().toLocaleString());
    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;
    const teacherId = data.teacherId;

    try {
        const url = `${protocol}://${domain}/api/v2/users/teachers/${teacherId}`;
        const bodyData = {
            status: data.status,
        };

        const res = await fetch(url, {
            method: "DELETE",
            body: JSON.stringify(bodyData),
        });

        const body = await res.json();
        if (res.status !== 200) {
            return {error: (<ErrorResponsePayload>body).error};
        }

        return {data: (<AdminDeleteResponsePayload>body) as OutputType};
    } catch (error) {
        return {error: (<Error>error).message};
    }
}
