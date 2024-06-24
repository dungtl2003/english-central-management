import {ActionState} from "@/lib/create-safe-action";
import {Class, Session, Teacher, Unit, User} from "@prisma/client";

export type OutputType = (Session & {
    class: Class & {
        unit: Unit;
        teacher: Teacher & {
            user: User;
        };
    };
})[];

export type ReturnType = ActionState<void, OutputType>;
