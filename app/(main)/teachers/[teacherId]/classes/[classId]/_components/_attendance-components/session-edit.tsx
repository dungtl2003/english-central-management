import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {Button} from "@/components/ui/button";
import React, {ReactElement} from "react";
import {FaEdit} from "react-icons/fa";
import AttendanceTable from "./attendance-table";
import {SessionTableModel} from "./session-table-model";

interface SessionEditProps {
    data: SessionTableModel;
}

export function SessionEdit({data}: SessionEditProps): ReactElement {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);

    const isDisabled: boolean =
        new Date().getDate() - new Date(data.attendanceDate).getDate() > 0;

    // const isEditable: boolean = data.status.toLowerCase() === "true";
    console.log(new Date("22/01/2024"));

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger disabled={isDisabled} asChild>
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
                <DialogHeader>
                    <DialogTitle className="text-2xl">
                        {`Class ${data.className}: ${data.attendanceDate}`}
                    </DialogTitle>
                </DialogHeader>
                <AttendanceTable />
                <DialogFooter>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button type="submit">Save attendance</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you absolutely sure?
                                </AlertDialogTitle>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={handleClose}>
                                    Continue
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
