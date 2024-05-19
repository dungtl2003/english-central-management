import * as React from "react";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

type selectProps = {
    valueChange: (...event: any[]) => void;
    selectValue: string;
};

export function RoleSelector(props: selectProps) {
    return (
        <Select
            onValueChange={props.valueChange}
            defaultValue={props.selectValue}
        >
            <SelectTrigger className="w-full">
                <SelectValue className="" placeholder="Choose a role ..." />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="teacher">Teacher</SelectItem>
                    <SelectItem value="parent">Parent</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
