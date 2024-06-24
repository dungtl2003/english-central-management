import {
    ErrorResponsePayload,
    Json,
    UserJwtSessionClaims,
    UserRole,
} from "@/constaints";
import {auth} from "@clerk/nextjs/server";
import {ApiError} from "next/dist/server/api-utils";
import {NextResponse} from "next/server";

export function buildErrorNextResponse(
    error: unknown,
    enableLogging: boolean = true
): NextResponse<ErrorResponsePayload> {
    let msg;

    if (error instanceof ApiError) {
        msg = error.message;

        if (enableLogging) console.error("Error: ", msg);
        return NextResponse.json<ErrorResponsePayload>(
            {error: msg},
            {status: error.statusCode}
        );
    } else if (error instanceof Error) {
        msg = error.message;

        if (enableLogging) console.error("Error: ", msg);
        return NextResponse.json<ErrorResponsePayload>(
            {error: msg},
            {status: 500}
        );
    } else {
        if (enableLogging) console.error("Error: ", "Unsupported error type");
        return NextResponse.json<ErrorResponsePayload>(
            {error: "Server error"},
            {status: 500}
        );
    }
}

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
