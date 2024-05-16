import {UserJwtSessionClaims} from "@/constaints";
import {auth} from "@clerk/nextjs/server";
import {UserRole} from "@prisma/client";
import {db} from "./db";

const isRoleValid = (permittedRoles: UserRole[], role: UserRole): boolean => {
    return Object.values(permittedRoles).includes(role);
};

export async function authHandler(permittedRoles: UserRole[]) {
    const clerkUserId = auth().userId;
    if (!clerkUserId) {
        throw new Error("No signed in user");
    }

    const jwt: UserJwtSessionClaims | null = auth().sessionClaims;
    const role: string | null = jwt?.metadata?.role.toUpperCase() ?? null;
    if (!role || !isRoleValid(permittedRoles, role as UserRole)) {
        throw new Error("No right permission");
    }

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
