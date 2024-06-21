import {Class, Session, Teacher, Unit, User} from "@prisma/client";

export type GetResponsePayload = ({
    class: {
        unit: Unit;
        teacher: {
            user: User;
        } & Teacher;
    } & Class;
} & Session)[];
