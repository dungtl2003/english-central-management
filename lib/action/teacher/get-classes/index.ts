import {ErrorResponsePayload} from "@/constaints";
import {InputType, OutputType, ReturnType} from "./types";
import {TeacherGetResponsePayload} from "@/app/api/v2/users/teachers/types";

export const handler = async (data: InputType): Promise<ReturnType> => {
    console.log("Timestamp: ", new Date().toLocaleString());

    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;
    const referTeacherId = data.referTeacherId;

    try {
        const getTeacherUrl = `${protocol}://${domain}/api/v2/users/teachers?referTeacherId=${referTeacherId}`;
        console.log(`Sending GET request to ${getTeacherUrl}`);
        const getTeacherResponse = await fetch(getTeacherUrl, {
            method: "GET",
        });

        const getTeachersPayload = await getTeacherResponse.json();
        if (getTeacherResponse.status !== 200) {
            throw new Error((<ErrorResponsePayload>getTeachersPayload).error);
        }

        if ((<TeacherGetResponsePayload>getTeachersPayload).length === 0) {
            throw new Error(
                `Cannot find teacher with refer ID ${referTeacherId}`
            );
        }

        const teacherId = (<TeacherGetResponsePayload>getTeachersPayload)[0].id;
        const getClassesUrl = `${protocol}://${domain}/api/v2/users/teachers/${teacherId}/classes`;
        console.log(`Sending GET request to ${getClassesUrl}`);
        const getClassesResponse = await fetch(getClassesUrl, {
            method: "GET",
        });

        const getClassesPayload = await getClassesResponse.json();
        if (getClassesResponse.status !== 200) {
            throw new Error((<ErrorResponsePayload>getClassesPayload).error);
        }

        return {data: getClassesPayload as OutputType};
    } catch (error) {
        return {error: (<Error>error).message};
    }
};
