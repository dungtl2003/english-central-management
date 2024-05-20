import * as React from "react";

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {ControllerRenderProps} from "react-hook-form";

export function RoleSelector(props: ControllerRenderProps) {
    return (
        <Select onValueChange={props.onChange} defaultValue={props.value}>
            <SelectTrigger className="w-full">
                <SelectValue className="" placeholder="Choose a role ..." />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectItem value="TEACHER">Teacher</SelectItem>
                    <SelectItem value="PARENT">Parent</SelectItem>
                    <SelectItem value="STUDENT">Student</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
