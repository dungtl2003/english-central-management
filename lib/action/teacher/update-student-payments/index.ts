import {ErrorType} from "../../generic";
import {InputType, OutputType, Payload, ReturnType} from "./types";

export const handler = async (data: InputType): Promise<ReturnType> => {
    console.log("Timestamp: ", new Date().toLocaleString());

    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;

    const url = `${protocol}://${domain}/api/teachers/${data.referTeacherId}/classes/${data.classId}/students/${data.studentId}/pay`;

    console.log(`Sending POST request to ${url}`);

    const payload = {
        studentId: data.studentId,
        classId: data.classId,
        parentId: data.parentId,
        discount: data.discount,
        payments: data.payments,
    } as Payload;

    try {
        const response = await fetch(url, {
            method: "POST",
            body: JSON.stringify(payload),
        });

        const body = await response.json();
        console.log("Received: ", body);

        if (response.status !== 200) {
            return {error: (<ErrorType>body).error};
        }

        return {data: body as OutputType};
    } catch (error) {
        return {error: (<Error>error).message};
    }
};
