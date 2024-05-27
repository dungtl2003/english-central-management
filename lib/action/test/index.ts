import {InputType, ReturnType} from "./types";
import {delay} from "@/lib/utils";

export const handler = async (data: InputType): Promise<ReturnType> => {
    console.log("In action test");
    await delay(3000);
    return {data: data};
};
