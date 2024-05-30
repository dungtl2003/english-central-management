import React, {ReactElement} from "react";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

interface TimePickerProps {
    hour: number[];
    minute: number[];
    title: string;
    defaultHour: string;
    defaultMinute: string;
}

const TimePicker = ({
    hour,
    minute,
    title,
    defaultHour,
    defaultMinute,
}: TimePickerProps): ReactElement => {
    return (
        <div className="col-span-2 grid grid-rows-2 items-center justify-center">
            <div className="text-center text-[14px]">{title}</div>
            <div className="grid grid-cols-2 gap-x-2">
                <Select defaultValue={defaultHour}>
                    <SelectTrigger className="w-[135px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {hour.map((h) => {
                                return (
                                    <SelectItem key={h} value={h.toString()}>
                                        {h}
                                    </SelectItem>
                                );
                            })}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <Select defaultValue={defaultMinute}>
                    <SelectTrigger className="w-[135px]">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            {minute.map((m) => {
                                return (
                                    <SelectItem key={m} value={m.toString()}>
                                        {m}
                                    </SelectItem>
                                );
                            })}
                        </SelectGroup>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default TimePicker;
