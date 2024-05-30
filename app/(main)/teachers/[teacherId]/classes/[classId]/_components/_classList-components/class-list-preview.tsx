import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
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
import {
    StudentInfo,
    StudentInfoArray,
} from "../../../../_components/class-info";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import React, {ReactElement} from "react";

type TablePreviewSheetProps = {
    data: StudentInfo;
};

const ClassListPreview: React.FC<TablePreviewSheetProps> = ({
    data,
}): ReactElement => {
    const [open, setOpen] = React.useState(false);
    const handleClose = () => setOpen(false);
    return (
        <>
            <div className="flex flex-row gap-x-4">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline">Detail</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Student name</SheetTitle>
                            <SheetDescription>
                                View more student properties. Click close when
                                you are done.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                            {StudentInfoArray.map((obj) => {
                                const key = obj.key as keyof StudentInfo;
                                return (
                                    <div
                                        key={obj.key}
                                        className="grid grid-cols-4 items-center gap-4"
                                    >
                                        <Label
                                            htmlFor={obj.key}
                                            className="text-left"
                                        >
                                            {obj.title}
                                        </Label>
                                        <Input
                                            id={obj.key}
                                            value={data[key] || ""}
                                            className="col-span-3"
                                            disabled
                                        />
                                    </div>
                                );
                            })}
                        </div>
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button>Close sheet</Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
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
                        className="max-w-[50%] min-h-[70%]"
                        onInteractOutside={(e) => e.preventDefault()}
                    >
                        <DialogHeader>
                            <DialogTitle className="text-2xl">
                                Họ tên học sinh + Mã học sinh
                            </DialogTitle>
                        </DialogHeader>
                        <DialogFooter>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button type="submit">Save record</Button>
                                </AlertDialogTrigger>
                                {/* Content goes here */}
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>
                                            Are you absolutely sure?
                                        </AlertDialogTitle>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            onClick={handleClose}
                                        >
                                            Continue
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </>
    );
};

export default ClassListPreview;
