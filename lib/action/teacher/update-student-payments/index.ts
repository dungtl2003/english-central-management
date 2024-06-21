import {PostResponsePayload} from "@/app/api/v2/tuitions/types";
import {InputType, OutputType, Payload, ReturnType} from "./types";
import {ErrorResponsePayload} from "@/constaints";

export const handler = async (data: InputType): Promise<ReturnType> => {
    console.log("Timestamp: ", new Date().toLocaleString());

    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;

    try {
        const url = `${protocol}://${domain}/api/v2/tuitions`;
        console.log(`Sending POST request to ${url}`);

        const payload = {
            studentId: data.studentId,
            classId: data.classId,
            parentId: data.parentId,
            discount: data.discount,
            payments: data.payments,
        } as Payload;

        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(payload),
        });

        const body = await response.json();
        if (response.status !== 200) {
            return {error: (<ErrorResponsePayload>body).error};
        }

        return {data: (<PostResponsePayload>body) as OutputType};
    } catch (error) {
        return {error: (<Error>error).message};
    }
};
