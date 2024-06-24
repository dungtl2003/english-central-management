import {ActionState} from "@/lib/create-safe-action";

export type InputType = {
    referUserId: string;
    unsafeMetadata: UserUnsafeMetadata | undefined;
};
export type OutputType = string;
export type ReturnType = ActionState<InputType, OutputType>;
