import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTrigger,
} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import React, {ReactElement} from "react";
import {FaEdit} from "react-icons/fa";
import AttendanceTable from "./attendance-table";
import AttendanceTimer from "./attendance-timer";
import ConfirmDialog from "@/components/comfirm-dialog";
import {SessionTableModel} from "./types";

export const SessionEdit: React.FC<{data: SessionTableModel}> = ({
    data,
}): ReactElement => {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);

    const canSeeAttendances = data.actualStartTime !== null;
    const canSaveAttendances =
        data.actualStartTime &&
        data.actualStartTime.getTime() <= new Date().getTime();

    //const saveAttendancesHandler = () => {};

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
                {canSeeAttendances ? <AttendanceTable data={data} /> : ""}
                <DialogFooter>
                    {canSaveAttendances ? (
                        <ConfirmDialog
                            onConfirm={handleClose}
                            title="Save attendance"
                        />
                    ) : (
                        ""
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
