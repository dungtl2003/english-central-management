export interface UserJwtSessionClaims extends CustomJwtSessionClaims {
    metadata?: {
        role?: string;
    };
    firstName?: string;
    lastName?: string;
}

export interface PublicMetadata extends UserPublicMetadata {
    role?: string;
}

export type Json = {
    [key: string]: string | string[];
};
