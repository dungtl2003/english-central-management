import {formatDate} from "@/lib/utils";
import {InputType, OutputType, ReturnType, ResponseType} from "./types";

export const handler = async (data: InputType): Promise<ReturnType> => {
    console.log("Timestamp: ", new Date().toLocaleString());

    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;
    const teacherId = data.teacherId;

    const url = `${protocol}://${domain}/api/classes?teacherId=${teacherId}`;

    console.log(`Sending GET request to ${url}`);

    try {
        const response = await fetch(url, {
            method: "GET",
        });

        const body = await response.json();
        console.log("Received: ", body);

        if (response.status !== 200) {
            return {error: body};
        }

        return {data: formatData(body as ResponseType)};
    } catch (error) {
        return {error: (<Error>error).message};
    }
};

const formatData = (fetchedData: ResponseType): OutputType[] | undefined => {
    if (!fetchedData) return undefined;

    const formattedData: OutputType[] = [];
    fetchedData.forEach((data) =>
        formattedData.push({
            className: `${data.unit.grade}.${data.index}`,
            teacher: `${data.teacher.user.lastName} ${data.teacher.user.firstName}`,
            year: String(data.unit.year),
            start: formatDate(new Date(data.startTime)),
            end: formatDate(new Date(data.endTime)),
            price:
                String(
                    Math.round(
                        Number(data.unit.price_per_session) *
                            data.unit.max_sessions *
                            100
                    ) / 100
                ) + "$",
        })
    );

    return formattedData;
};
