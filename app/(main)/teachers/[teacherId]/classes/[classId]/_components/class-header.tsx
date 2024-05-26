import {Button} from "@/components/ui/button";
import {FaPlusCircle} from "react-icons/fa";
import React, {ReactElement} from "react";
import {DatePicker} from "./date-picker";

const ClassDetailHeader = (): ReactElement => {
    return (
        <div className="flex flex-row items-center">
            <span className="text-5xl font-semibold">Class Detail</span>
            <div className="flex flex-row items-center ml-auto gap-x-2">
                <DatePicker />
                <Button variant="outline">
                    <span className="pr-1">
                        <FaPlusCircle />
                    </span>
                    Attendance
                </Button>
            </div>
        </div>
    );
};

export default ClassDetailHeader;
