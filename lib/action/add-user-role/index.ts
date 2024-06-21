import {UserRole} from "@prisma/client";
import {Body, InputType, ReturnType} from "./types";
import {ErrorResponsePayload} from "@/constaints";

export const handler = async (data: InputType): Promise<ReturnType> => {
    console.log("Timestamp: ", new Date().toLocaleString());

    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;
    const role = data.role;

    if (!Object.values(UserRole).includes(role as UserRole)) {
        return {error: "Invalid role"};
    }

    try {
        const url = `${protocol}://${domain}/api/v2/users/${role.toLowerCase()}s`;
        const payload: Body = {
            id: data.id,
        };

        console.log(`Sending POST request to ${url}`);
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(payload),
        });

        const body = await response.json();
        if (response.status !== 200) {
            return {error: (<ErrorResponsePayload>body).error};
        }

        return {data: JSON.stringify(body)};
    } catch (error) {
        return {error: (<Error>error).message};
    }
};
