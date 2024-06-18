import {OutputType, ReturnType} from "./types";

export async function handle(): Promise<ReturnType> {
    console.log("Timestamp: ", new Date().toLocaleString());

    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;

    const url = `${protocol}://${domain}/api/teachers`;

    console.log(`Sending GET request to ${url}`);

    try {
        const response = await fetch(url, {
            method: "GET",
        });

        const body = await response.json();
        console.log("Received:", body);

        if (response.status !== 200) {
            return {error: body}; //TODO: fix later - body not string
        }

        const data = body as OutputType;
        return {data: data};
    } catch (error) {
        return {error: (<Error>error).message};
    }
}
