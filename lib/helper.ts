import {Json, UserJwtSessionClaims, UserRole} from "@/constaints";
import {auth} from "@clerk/nextjs/server";
import {db} from "./db";

export async function authHandler(): Promise<void> {
    const clerkUserId = auth().userId;
    if (!clerkUserId) {
        throw new Error("No signed in user");
    }

    const jwt: UserJwtSessionClaims | null = auth().sessionClaims;
    const role: string | null = jwt?.metadata?.role ?? null;

    const user = await db.user.findFirst({
        where: {
            referId: clerkUserId,
            role: role as UserRole,
        },
    });

    if (!user) {
        throw new Error(
            `Cannot find account with id ${clerkUserId} in database`
        );
    }
}

export function getClerkRole(): UserRole | null {
    const jwt: UserJwtSessionClaims | null = auth().sessionClaims;
    return (jwt?.metadata?.role as UserRole) ?? null;
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
