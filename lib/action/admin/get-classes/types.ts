import {ActionState} from "@/lib/create-safe-action";
import {Class, Teacher, Unit, User} from "@prisma/client";

export type InputType = void;

export type OutputType = ({
    unit: Unit;
    teacher: {
        user: User;
    } & Teacher;
    numOfJoinedStudents: number;
    numOfPendingStudents: number;
} & Class)[];

export type ReturnType = ActionState<InputType, OutputType>;
