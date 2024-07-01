import {Parent, User} from "@prisma/client";

export type AdminGetResponsePayload = void;

export type ParentGetResponsePayload = {
    user: User;
} & Parent;
