import React, {ReactElement, useMemo} from "react";
import {Separator} from "@/components/ui/separator";
import {TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Button} from "@/components/ui/button";
import {
    InputType,
    OutputType as OutputTypeUpdateTeacher,
} from "@/lib/action/admin/update-teacher/types";
import {UseActionOptions, useAction} from "@/hooks/use-action";
import {toast} from "@/components/ui/use-toast";
import {handler} from "@/lib/action/admin/update-teacher";
import ConfirmDialog from "@/components/comfirm-dialog";
import {TeacherStatus} from "@prisma/client";
import {useUser} from "@clerk/nextjs";

// Đoạn này mô tả ý tưởng về việc nếu chưa được duyệt thì sẽ hiển thị nút nào
// const status: string = "pending"; // => trạng thái của giáo viên
const GetButtonBasedOnStatus = (
    currentStatus: TeacherStatus,
    teacherId: string,
    referAdminId: string,
    setIsStatusUpdating: (v: boolean) => void
): ReactElement => {
    const eventUpdateTeacher: UseActionOptions<OutputTypeUpdateTeacher> =
        useMemo(() => {
            return {
                onError: (error: string) => {
                    console.log("Error: ", error);
                    toast({
                        title: "error",
                        variant: "destructive",
                        description: `FAIL to update status this teacher`,
                    });
                },
                onSuccess: (data: OutputTypeUpdateTeacher) => {
                    console.log(
                        "Update status this teacher successful: ",
                        data
                    );
                    toast({
                        title: "success",
                        variant: "default",
                        description: `Update status this teacher successful`,
                    });
                },
            };
        }, []);

    const {execute} = useAction(handler, eventUpdateTeacher);

    const dataActionApprove: InputType = {
        teacherId: teacherId,
        referAdminId: referAdminId,
        status: "AVAILABLE",
        acceptedAt: new Date(),
    };

    const dataActionReject: InputType = {
        teacherId: teacherId,
        referAdminId: referAdminId,
        status: "REJECTED",
        deletedAt: new Date(),
    };

    const dataActionDelete: InputType = {
        teacherId: teacherId,
        referAdminId: referAdminId,
        status: "DELETED",
        deletedAt: new Date(),
    };

    const handleApproveClick = () => {
        setIsStatusUpdating(true);
        execute(dataActionApprove).then(() => {
            setIsStatusUpdating(false);
            window.location.reload();
        });
    };

    const handleRejectClick = () => {
        console.log("This is reject button");
        setIsStatusUpdating(true);
        execute(dataActionReject).then(() => {
            setIsStatusUpdating(false);
            window.location.reload();
        });
    };

    const handleDeleteClick = () => {
        console.log("This is delete button");
        setIsStatusUpdating(true);
        execute(dataActionDelete).then(() => {
            setIsStatusUpdating(false);
            window.location.reload();
        });
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
    const {user} = useUser();
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
                        user?.id as string,
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
