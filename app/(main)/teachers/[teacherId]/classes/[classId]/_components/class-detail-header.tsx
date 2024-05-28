import React, {ReactElement} from "react";
import {DatePicker} from "./date-picker";
import {CreateAttendance} from "./_attendance-components/edit-attendance";

const ClassDetailHeader = (): ReactElement => {
    return (
        <div className="flex flex-row items-center">
            <span className="text-4xl font-semibold">Class Detail</span>
            <div className="flex flex-row items-center ml-auto gap-x-2">
                <DatePicker />
                <CreateAttendance />
            </div>
        </div>
    );
};

export default ClassDetailHeader;
