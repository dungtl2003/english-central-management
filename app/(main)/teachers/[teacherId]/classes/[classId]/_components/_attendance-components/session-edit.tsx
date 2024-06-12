import {Dialog, DialogContent, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import React, {ReactElement} from "react";
import {FaEdit} from "react-icons/fa";
import AttendanceTimer from "./attendance-timer";
import {SessionTableModel} from "./types";
import AttendanceTable from "./attendance-table";

export const SessionEdit: React.FC<{data: SessionTableModel}> = ({
    data,
}): ReactElement => {
    const [open, setOpen] = React.useState(false);

    const canSeeAttendances = data.actualStartTime !== null;
    const canSaveAttendances = !!(
        data.actualStartTime &&
        data.actualStartTime.getTime() <= new Date().getTime()
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <span className="pr-1">
                        <FaEdit />
                    </span>
                    Edit
                </Button>
            </DialogTrigger>
            <DialogContent
                className="max-w-[80%] min-h-[80%]"
                onInteractOutside={(e) => e.preventDefault()}
            >
                <AttendanceTimer data={data} />
                {canSeeAttendances ? (
                    <AttendanceTable
                        data={data}
                        canSaveAttendances={canSaveAttendances}
                    />
                ) : (
                    ""
                )}
            </DialogContent>
        </Dialog>
    );
};
