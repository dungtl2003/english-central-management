import {ActionState} from "@/lib/create-safe-action";
import {Class, Unit} from "@prisma/client";

export type InputType = void;

export type OutputType = ({
    unit: Unit;
    numOfJoinedStudents: number;
    numOfPendingStudents: number;
} & Class)[];

export type ReturnType = ActionState<InputType, OutputType>;
