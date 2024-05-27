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
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {Button} from "@/components/ui/button";
import React, {ReactElement} from "react";
import {FaPlusCircle} from "react-icons/fa";
import AttendanceTable from "./attendance-table";

export function CreateAttendance(): ReactElement {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <span className="pr-1">
                        <FaPlusCircle />
                    </span>
                    Attendance
                </Button>
            </DialogTrigger>
            <DialogContent
                className="max-w-[80%] min-h-[80%]"
                onInteractOutside={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="text-2xl">
                        Class 3.1: 26/05/2024
                    </DialogTitle>
                </DialogHeader>
                <AttendanceTable />
                <DialogFooter>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button type="submit">Save record</Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>
                                    Are you absolutely sure?
                                </AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will
                                    permanently delete your account and remove
                                    your data from our servers.
                                </AlertDialogDescription>
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
