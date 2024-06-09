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

export enum UserRole {
    ADMIN = "ADMIN",
    TEACHER = "TEACHER",
    STUDENT = "STUDENT",
    PARENT = "PARENT",
}

export interface PublicMetadata extends UserPublicMetadata {
    role?: string;
}
