import React, {ReactElement, useMemo} from "react";
import {Separator} from "@/components/ui/separator";
import {TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Button} from "@/components/ui/button";
import {
    InputType,
    OutputType as UpdateOutputType,
} from "@/lib/action/admin/update-teacher/types";
import {UseActionOptions, useAction} from "@/hooks/use-action";
import {toast} from "@/components/ui/use-toast";
import {handler as updateHandler} from "@/lib/action/admin/update-teacher";
import ConfirmDialog from "@/components/comfirm-dialog";
import {TeacherStatus} from "@prisma/client";
import {handler as deleteHandler} from "@/lib/action/admin/delete-teacher";
import {OutputType as DeleteOutputType} from "@/lib/action/admin/delete-teacher/types";

// Đoạn này mô tả ý tưởng về việc nếu chưa được duyệt thì sẽ hiển thị nút nào
// const status: string = "pending"; // => trạng thái của giáo viên
const GetButtonBasedOnStatus = (
    currentStatus: TeacherStatus,
    teacherId: string,
    setIsStatusUpdating: (v: boolean) => void
): ReactElement => {
    const deleteEvent: UseActionOptions<DeleteOutputType> = useMemo(() => {
        return {
            onError: (error: string) => {
                console.error("Error: ", error);
                toast({
                    title: "error",
                    variant: "destructive",
                    description: `Fail to delete/reject this teacher`,
                });
            },
            onSuccess: () => {
                toast({
                    title: "success",
                    variant: "success",
                    description: `Delete/reject teacher successful`,
                });
                setIsStatusUpdating(false);
                window.location.reload();
            },
        };
    }, [setIsStatusUpdating]);
    const updateEvent: UseActionOptions<UpdateOutputType> = useMemo(() => {
        return {
            onError: (error: string) => {
                console.error("Error: ", error);
                toast({
                    title: "error",
                    variant: "destructive",
                    description: `Fail to update status this teacher`,
                });
            },
            onSuccess: () => {
                toast({
                    title: "success",
                    variant: "success",
                    description: `Update status this teacher successful`,
                });
                setIsStatusUpdating(false);
                window.location.reload();
            },
        };
    }, [setIsStatusUpdating]);

    const {execute: execUpdate} = useAction(updateHandler, updateEvent);
    const {execute: execDelete} = useAction(deleteHandler, deleteEvent);

    const dataActionApprove: InputType = {
        teacherId: teacherId,
        status: "AVAILABLE",
        acceptedAt: new Date(),
    };

    const dataActionReject: InputType = {
        teacherId: teacherId,
        status: "REJECTED",
    };

    const dataActionDelete: InputType = {
        teacherId: teacherId,
        status: "DELETED",
    };

    const handleApproveClick = () => {
        setIsStatusUpdating(true);
        execUpdate(dataActionApprove);
    };

    const handleRejectClick = () => {
        setIsStatusUpdating(true);
        execDelete(dataActionReject);
    };

    const handleDeleteClick = () => {
        setIsStatusUpdating(true);
        execDelete(dataActionDelete);
    };

    //=> nếu chưa được duyệt thì sẽ là nút Approve và Reject
    if (currentStatus === "PENDING") {
        return (
            <>
                <ConfirmDialog
                    title="Approve"
                    className="min-w-[85px] max-w-[85px]"
                    variant="success"
                    onConfirm={handleApproveClick}
                    confirmText="Yes"
                />
                <ConfirmDialog
                    title="Reject"
                    className="min-w-[85px] max-w-[85px]"
                    variant="destructive"
                    onConfirm={handleRejectClick}
                    confirmText="Yes"
                />
            </>
        );
    }
    if (currentStatus === "TEACHING") {
        return (
            <Button
                className="min-w-[85px] max-w-[85px]"
                variant="destructive"
                disabled={true}
            >
                Delete
            </Button>
        );
    }

    if (currentStatus === "DELETED" || currentStatus === "REJECTED") {
        return <></>;
    }

    if (currentStatus === "AVAILABLE") {
        return (
            <ConfirmDialog
                title="Delete"
                className="min-w-[85px] max-w-[85px]"
                variant="destructive"
                onConfirm={handleDeleteClick}
                confirmText="Yes"
            />
        );
    }

    return <> Do not have role </>;
};

const TeacherDetailTabslist = ({
    currentStatus,
    teacherId,
    setIsStatusUpdating,
}: {
    currentStatus: string;
    teacherId: string;
    setIsStatusUpdating: (v: boolean) => void;
}): ReactElement => {
    return (
        <div className="col-span-1 pl-2 grid grid-cols-10">
            <TabsList className="col-span-9 grid grid-rows-11">
                <div>
                    <TabsTrigger
                        className="w-full text-left dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-slate-50 data-[state=active]:bg-slate-200 data-[state=active]:text-slate-950"
                        value="teacherInfo"
                    >
                        Teacher informations
                    </TabsTrigger>
                </div>
                <div>
                    <TabsTrigger
                        className="w-full text-left dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-slate-50 data-[state=active]:bg-slate-200 data-[state=active]:text-slate-950"
                        value="salaryDetail"
                    >
                        Salary detail
                    </TabsTrigger>
                </div>
                <div>
                    <TabsTrigger
                        className="w-full text-left dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-slate-50 data-[state=active]:bg-slate-200 data-[state=active]:text-slate-950"
                        value="classList"
                    >
                        Class list
                    </TabsTrigger>
                </div>
                <div className="row-span-6"></div>
                <div className="row-span-2 flex items-center justify-evenly	">
                    {GetButtonBasedOnStatus(
                        currentStatus as TeacherStatus,
                        teacherId,
                        setIsStatusUpdating
                    )}
                </div>
            </TabsList>
            <div className="flex justify-center pt-1">
                <Separator orientation="vertical" />
            </div>
        </div>
    );
};

export default TeacherDetailTabslist;
