import {InputType, ReturnType} from "./types";

export const handler = async (data: InputType): Promise<ReturnType> => {
    console.log("Timestamp: ", new Date().toLocaleString());

    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;
    const teacherId = data.id;

    const url = `${protocol}://${domain}/api/teachers/${teacherId}`;

    console.log(`Sending PATCH request to ${url}`);

    try {
        const response = await fetch(url, {
            method: "PATCH",
            body: JSON.stringify(data),
        });

        const body = await response.json();

        console.log("Updated teacher: ", body);

        if (response.status !== 200) {
            return {error: body};
        }

        return {data: body};
    } catch (error) {
        return {error: (<Error>error).message};
    }
};
