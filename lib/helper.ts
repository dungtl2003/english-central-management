import {Json, UserJwtSessionClaims, UserRole} from "@/constaints";
import {auth} from "@clerk/nextjs/server";

export function getClerkRole(): UserRole | null {
    const jwt: UserJwtSessionClaims | null = auth().sessionClaims;
    return (jwt?.metadata?.public?.role as UserRole) ?? null;
}

export function convertQueryParamsToJsonObject(
    queryParams: URLSearchParams
): Json {
    const json: Json = {};

    queryParams.forEach((value, key) => {
        if (!(key in json)) {
            json[key] = value;
        } else {
            if (Array.isArray(json[key])) {
                const values: string[] = json[key] as string[];
                json[key] = [...values, value];
            } else {
                json[key] = [json[key] as string, value];
            }
        }
    });

    return json;
}
