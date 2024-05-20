import {InputType, ReturnType, TeacherResponseType} from "./types";

export const handler = async (data: InputType): Promise<ReturnType> => {
    console.log("Timestamp: ", new Date().toLocaleString());

    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;
    const url = `${protocol}://${domain}/api/teachers`;

    console.log(`Sending POST request to ${url}`);

    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(data),
        });

        const body = await response.json();
        console.log("Received: ", body);

        if (response.status !== 200) {
            return {error: body};
        }

        return {data: body as TeacherResponseType};
    } catch (error) {
        return {error: (<Error>error).message};
    }
};
