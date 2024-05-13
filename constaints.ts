export enum UserRole {
    ADMIN = "admin",
    TEACHER = "teacher",
    STUDENT = "student",
    PARENT = "parent",
}

export interface UserJwtSessionClaims extends CustomJwtSessionClaims {
    metadata?: {
        role: UserRole;
    };
}
