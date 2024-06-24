import {Class, Teacher, Unit, User} from "@prisma/client";

export type GetResponsePayload = ({
    unit: Unit;
    teacher: {
        user: User;
    } & Teacher;
} & Class)[];
