import {Parent, Student, Tuition, User} from "@prisma/client";

export type AdminGetResponsePayload = {
    user: User;
    children: ({
        user: User;
        tuitions: Tuition[];
    } & Student)[];
} & Parent;

export type ParentGetResponsePayload = {
    user: User;
} & Parent;
