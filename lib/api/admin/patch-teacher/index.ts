import {InputType, ReturnType} from "./types";

export const handler = async (data: InputType): Promise<ReturnType> => {
    console.log("Timestamp: ", new Date().toLocaleString());

    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;
    const teacherId = data.teacherId;

    const url = `${protocol}://${domain}/api/teachers/${teacherId}`;

    try {
        const res = await fetch(url, {
            method: "PATCH",
            body: JSON.stringify(data),
        });

        const body = await res.json();
        console.log("Updated: ", body);

        if (res.status !== 200) {
            return {error: body};
        }

        return {data: body};
    } catch (error) {
        return {error: (<Error>error).message};
    }
};
