import {ErrorResponsePayload} from "@/constaints";
import {InputType, OutputType, ReturnType} from "./types";
import {TeacherGetResponsePayload as TeachersResponsePayload} from "@/app/api/v2/users/teachers/types";
import {TeacherGetResponsePayload as TeacherDetailResponsePayload} from "@/app/api/v2/users/teachers/[teacherId]/types";

export const handler = async (data: InputType): Promise<ReturnType> => {
    console.log("Timestamp: ", new Date().toLocaleString());

    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;

    try {
        const getTeachersUrl = `${protocol}://${domain}/api/v2/users/teachers?referTeacherId=${data.referTeacherId}`;
        console.log(`Sending GET request to ${getTeachersUrl}`);
        const getTeachersResponse = await fetch(getTeachersUrl, {
            method: "GET",
        });

        const getTeachersPayload = await getTeachersResponse.json();
        if (getTeachersResponse.status !== 200) {
            return {error: (<ErrorResponsePayload>getTeachersPayload).error};
        }

        const teachers: TeachersResponsePayload = getTeachersPayload;
        if (teachers.length === 0) {
            throw new Error(
                `No teacher with refer ID ${data.referTeacherId} found`
            );
        }

        const teacherId = teachers[0].id;
        const getTeacherUrl = `${protocol}://${domain}/api/v2/users/teachers/${teacherId}`;
        console.log(`Sending GET request to ${getTeacherUrl}`);
        const getTeacherResponse = await fetch(getTeacherUrl, {
            method: "GET",
        });

        const getTeacherPayload = await getTeacherResponse.json();
        if (getTeacherResponse.status !== 200) {
            return {error: (<ErrorResponsePayload>getTeacherPayload).error};
        }

        return {
            data: (<TeacherDetailResponsePayload>(
                getTeacherPayload
            )) as OutputType,
        };
    } catch (error) {
        return {error: (<Error>error).message};
    }
};
