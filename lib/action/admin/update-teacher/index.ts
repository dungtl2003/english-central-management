import {ErrorResponsePayload} from "@/constaints";
import {InputType, OutputType, ReturnType} from "./types";
import {AdminPatchResponsePayload} from "@/app/api/v2/users/teachers/[teacherId]/types";

export async function handler(data: InputType): Promise<ReturnType> {
    console.log("Timestamp: ", new Date().toLocaleString());
    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;
    const teacherId = data.teacherId;

    const url = `${protocol}://${domain}/api/v2/users/teachers/${teacherId}`;

    const bodyData = {
        baseSalary: data.baseSalary,
        status: data.status,
        acceptedAt: data.acceptedAt,
    };

    try {
        const res = await fetch(url, {
            method: "PATCH",
            body: JSON.stringify(bodyData),
        });

        const body = await res.json();
        if (res.status !== 200) {
            return {error: (<ErrorResponsePayload>body).error};
        }

        return {data: (<AdminPatchResponsePayload>body) as OutputType};
    } catch (error) {
        return {error: (<Error>error).message};
    }
}
