export interface UserJwtSessionClaims extends CustomJwtSessionClaims {
    metadata?: {
        role?: string;
    };
    firstName?: string;
    lastName?: string;
}
