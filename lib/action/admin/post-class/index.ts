import {InputType, ReturnType} from "./types";

export const handler = async (data: InputType): Promise<ReturnType> => {
    console.log("Timestamp: ", new Date().toLocaleString());

    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;

    const url = `${protocol}://${domain}/api/classes`;

    console.log(`Sending POST request to ${url}`);

    try {
        const res = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
        });

        const body = await res.json();
        console.log("Added classes: ", body);

        if (res.status !== 200) {
            return {error: body};
        }

        return {data: body};
    } catch (error) {
        return {error: (<Error>error).message};
    }
};
