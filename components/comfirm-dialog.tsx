import React, {ReactElement} from "react";
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
import {Button} from "./ui/button";

interface ConfirmDialogProps {
    title: string;
}

const ConfirmDialog = ({title}: ConfirmDialogProps): ReactElement => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button type="submit">{title}</Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="h-[180px]">
                <AlertDialogHeader className="flex items-center justify-center">
                    <AlertDialogTitle className="flex items-center justify-center text-2xl">
                        Are you absolutely sure?
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter className="grid grid-cols-2 items-center ">
                    <AlertDialogCancel className="min-w-[160px] text-md justify-self-center">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction className="min-w-[160px] text-md justify-self-center">
                        Save
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ConfirmDialog;