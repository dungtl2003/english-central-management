import {Gender} from "@prisma/client";

export const DEFAULT_AVATAR_URL =
    "https://avatars.githubusercontent.com/u/124599?v=4";

export interface ErrorResponsePayload {
    error: string;
}

export interface UserJwtSessionClaims extends CustomJwtSessionClaims {
    metadata?: {
        public?: PublicMetadata;
        unsafe?: UnsafeMetadata;
    };
}

export interface PublicMetadata extends UserPublicMetadata {
    role?: string;
}

export interface UnsafeMetadata extends UserUnsafeMetadata {
    phoneNumber?: string;
    identityCard?: string;
    birthday?: Date;
    gender?: Gender;
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
