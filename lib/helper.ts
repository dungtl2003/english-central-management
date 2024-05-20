import {UserJwtSessionClaims} from "@/constaints";
import {auth} from "@clerk/nextjs/server";
import {UserRole} from "@prisma/client";
import {db} from "./db";

export async function authHandler(): Promise<void> {
    const clerkUserId = auth().userId;
    if (!clerkUserId) {
        throw new Error("No signed in user");
    }

    const jwt: UserJwtSessionClaims | null = auth().sessionClaims;
    console.log(jwt);
    const role: string | null = jwt?.metadata?.role ?? null;

    const user = await db.user.findFirst({
        where: {
            referId: clerkUserId,
            role: role as UserRole,
        },
    });

    if (!user) {
        throw new Error(
            `Cannot find account with id ${clerkUserId} and role ${role} in database`
        );
    }
}

export function getClerkRole(): UserRole | null {
    const jwt: UserJwtSessionClaims | null = auth().sessionClaims;
    console.log(jwt!.metadata);
    return (jwt?.metadata?.role as UserRole) ?? null;
}
