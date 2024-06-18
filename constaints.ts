import {Gender} from "@prisma/client";

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
