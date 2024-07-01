import React, {ReactElement} from "react";
import {Button} from "@/components/ui/button";
import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import AttendancePopupTable from "./attendance-popup-components/attendance-popup-table";
import {AttendanceOfStudent} from "./types";

const AttendancePopup = ({
    attendanceTable,
}: {
    attendanceTable: {
        numberStudentsPresent: string;
        numberStudentsLate: string;
        numberStudentsAbsent: string;
    } & {
        attendances: AttendanceOfStudent[];
    };
}): ReactElement => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    className="py-0 px-2 m-0 w-full justify-start"
                    variant="ghost"
                >
                    Attendance
                </Button>
            </DialogTrigger>

            <DialogContent className="max-w-[60%] min-h-[75%]">
                <div className="flex justify-center items-center text-2xl">
                    Attendance table
                </div>
                <AttendancePopupTable attendanceTable={attendanceTable} />
            </DialogContent>
        </Dialog>
    );
};

export default AttendancePopup;
