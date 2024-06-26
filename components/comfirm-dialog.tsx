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
import {Loader2} from "lucide-react";
import {Button, ButtonProps} from "./ui/button";

interface ConfirmDialogProps extends ButtonProps {
    title: string;
    customClass?: string;
    onConfirm?: () => void;
    isLoading?: boolean;
    confirmText?: string;
}

const ConfirmDialog = ({
    title,
    customClass,
    onConfirm,
    isLoading,
    confirmText,
    ...props
}: ConfirmDialogProps): ReactElement => {
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {isLoading !== undefined ? (
                    <Button
                        className={customClass ? customClass : ""}
                        type="submit"
                        disabled={isLoading}
                        {...props}
                    >
                        {isLoading && (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        {isLoading ? "Please wait" : title}
                    </Button>
                ) : (
                    <Button
                        className={customClass ? customClass : ""}
                        type="submit"
                        {...props}
                    >
                        {title}
                    </Button>
                )}
            </AlertDialogTrigger>
            <AlertDialogContent className="h-[180px]">
                <AlertDialogHeader className="flex items-center justify-center">
                    <AlertDialogTitle className="flex items-center justify-center text-2xl">
                        Are you sure?
                    </AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogFooter className="grid grid-cols-2 items-center ">
                    <AlertDialogCancel className="min-w-[160px] text-md justify-self-center">
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm ? onConfirm : undefined}
                        className="min-w-[160px] text-md justify-self-center"
                    >
                        {confirmText || "Save"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ConfirmDialog;
