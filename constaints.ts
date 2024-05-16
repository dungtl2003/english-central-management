import {UserRole} from "@prisma/client";

export interface UserJwtSessionClaims extends CustomJwtSessionClaims {
    metadata?: {
        role: UserRole;
    };
}
