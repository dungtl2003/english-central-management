import {ActionState} from "@/lib/create-safe-action";

// type OutputType = {userId:string}
// type InputType = {clerkId:string}
type ReturnType = ActionState<void, string>;

export const handler = async (): Promise<ReturnType> => {
    console.log("Timestamp: ", new Date().toLocaleString());

    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;

    const url = `${protocol}://${domain}/api/user`;

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

        return {data: body as string};
    } catch (error) {
        return {error: (<Error>error).message};
    }
};
