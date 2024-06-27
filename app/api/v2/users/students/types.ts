import {Student, User} from "@prisma/client";

export type GetResponsePayload = ({
    user: User;
    isRequesting: boolean;
} & Student)[];
