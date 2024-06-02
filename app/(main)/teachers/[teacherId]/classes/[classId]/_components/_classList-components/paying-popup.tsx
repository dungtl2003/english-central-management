import React, {ReactElement} from "react";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import ConfirmDialog from "@/components/comfirm-dialog";
import {Button} from "@/components/ui/button";
import PayingPopupContent from "./paying-popup-content";
import {StudentInfo} from "../_attendance-components/student-info";
import {DialogDescription} from "@radix-ui/react-dialog";

type PayingPopupProps = {
    data: StudentInfo;
};

const PayingPopup = ({data}: PayingPopupProps): ReactElement => {
    const [open, setOpen] = React.useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline">
                    <span className="pr-1">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="currentColor"
                            className="size-4"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                        </svg>
                    </span>
                    Pay
                </Button>
            </DialogTrigger>
            <DialogContent
                className="max-w-[70%] min-h-[70%]"
                onInteractOutside={(e) => e.preventDefault()}
            >
                <DialogHeader className="justify-center items-center">
                    <DialogTitle className="text-2xl">
                        {data.fullName}
                    </DialogTitle>
                    <DialogDescription>{data.studentCode}</DialogDescription>
                </DialogHeader>
                <PayingPopupContent />
                <div className="flex items-center justify-center">
                    <ConfirmDialog customClass="w-[150px]" title="Save" />
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default PayingPopup;
