import {InputType, OutputType, ReturnType} from "./types";

export async function handler(data: InputType): Promise<ReturnType> {
    console.log("Timestamp: ", new Date().toLocaleString());
    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;
    const teacherId = data.teacherId;
    const referAdminId = data.referAdminId;

    const url = `${protocol}://${domain}/api/admins/${referAdminId}/teachers/${teacherId}`;

    try {
        const res = await fetch(url, {
            method: "GET",
        });
        const body = await res.json();
        console.log("Received: ", body);
        if (res.status !== 200) {
            return {error: body}; //TODO: fix later - body not string
        }

        const data = body as OutputType;
        return {data: data};
    } catch (error) {
        return {error: (<Error>error).message};
    }
}
