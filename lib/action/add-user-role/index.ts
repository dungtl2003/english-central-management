import {UserRole} from "@prisma/client";
import {Body, InputType, ReturnType} from "./types";

export const handler = async (data: InputType): Promise<ReturnType> => {
    console.log("Timestamp: ", new Date().toLocaleString());

    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;
    const role = data.role;

    if (!Object.values(UserRole).includes(role as UserRole)) {
        return {error: "Invalid role"};
    }

    const url = `${protocol}://${domain}/api/${role.toLowerCase()}s`;
    const bodyData: Body = {
        id: data.id,
    };

    console.log(`Sending POST request to ${url}`);

    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(bodyData),
        });

        const body = await response.json();
        console.log("Received: ", body);

        if (response.status !== 200) {
            return {error: body};
        }

        return {data: JSON.stringify(body)};
    } catch (error) {
        return {error: (<Error>error).message};
    }
};
