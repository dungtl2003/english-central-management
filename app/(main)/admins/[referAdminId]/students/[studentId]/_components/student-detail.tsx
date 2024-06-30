"use client";

import React, {ReactElement, useCallback, useMemo, useState} from "react";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {Tabs} from "@/components/ui/tabs";
import StudentDetailHeader from "./student-detail-header";
import StudentDetailTabslist from "./student-detail-tabs-list";
import StudentInformationTab from "./student-information-components/student-information-tab";
import StudentClassListTab from "./class-list-components/class-list-tab";
import DesiredClassTab from "./desired-class-components/desired-class-tab";
import {StudentClassesData, StudentDetailData, StudentStatus} from "./types";
import {OutputType as GetDetailOutputType} from "@/lib/action/admin/get-student-detail/types";
import {handler} from "@/lib/action/admin/delete-student";
import {UseActionOptions, useAction} from "@/hooks/use-action";
import {OutputType as DeleteOutputType} from "@/lib/action/admin/delete-student/types";
import {useToast} from "@/components/ui/use-toast";

const getButtonBasedOnStatus = (
    currentStatus: string,
    deleteStudent: () => void
): ReactElement => {
    if (currentStatus === StudentStatus.ACTIVE) {
        return (
            <>
                <Button
                    className="min-w-[85px] max-w-[85px]"
                    variant="destructive"
                    onClick={deleteStudent}
                >
                    Delete
                </Button>
            </>
        );
    }
    if (currentStatus === StudentStatus.DELETED) {
        return <></>;
    }
    return <></>;
};

const getStatusColor = (status: string): ReactElement => {
    switch (status) {
        case StudentStatus.ACTIVE:
            return (
                <span className="ml-[5px] dark:text-green-400 text-green-600">
                    {" "}
                    Active
                </span>
            );
        case StudentStatus.DELETED:
            return (
                <span className="ml-[5px] dark:text-red-500 text-red-600">
                    {" "}
                    Deleted
                </span>
            );
    }
    return <span>Error</span>;
};

const formatData = (
    data: GetDetailOutputType | undefined
): StudentDetailData | undefined => {
    if (!data) return undefined;
    const studentDesiredClasses: StudentClassesData[] = [];
    const studentaCurrentClasses: StudentClassesData[] = [];
    data.classes.forEach((element) => {
        if (element.approvedAt && !element.rejectedAt)
            studentaCurrentClasses.push(element as StudentClassesData);
        if (!element.rejectedAt && !element.approvedAt)
            studentDesiredClasses.push(element as StudentClassesData);
    });

    const student: StudentDetailData = {
        studentInfoData: {
            id: data.id,
            discount: data.discount,
            user: data.user,
            parents: data.parents,
        },
        studentDesiredClassesData: studentDesiredClasses,
        studentaCurrentClassesData: studentaCurrentClasses,
    };
    return student;
};

const StudentDetail = ({
    studentDetail,
}: {
    studentDetail: GetDetailOutputType | undefined;
}): ReactElement => {
    const {toast} = useToast();
    const memoHandler = useCallback(handler, []);
    const memoEvent = useMemo(() => {
        return {
            onError: (error: string) => {
                console.error("Error: ", error);
                toast({
                    title: "error",
                    variant: "destructive",
                    description: "Failed to delete this student",
                });
            },
            onSuccess: () => {
                toast({
                    title: "Success",
                    variant: "success",
                    description: "Delete student successful",
                });
                window.location.reload();
            },
        } as UseActionOptions<DeleteOutputType>;
    }, []);
    const {execute} = useAction(memoHandler, memoEvent);

    const deleteStudent = () => {
        if (!studentDetail) return;

        execute({
            studentId: studentDetail.id,
        });
    };

    const {
        studentInfoData,
        studentDesiredClassesData,
        studentaCurrentClassesData,
    } = (formatData(studentDetail) as StudentDetailData) || null;
    const [currentDiscount, setCurrentDiscount] = useState<number>(
        studentInfoData.discount || 0
    );

    return (
        <div className="w-[80%] min-h-[680px] pt-[90px]">
            <Card className="min-h-full">
                <div className="grid grid-rows-6">
                    <StudentDetailHeader
                        studentId={studentInfoData.id!}
                        firstName={studentInfoData.user.firstName || "___"}
                        lastName={studentInfoData.user.lastName || "___"}
                        status={
                            studentInfoData.user.deletedAt
                                ? StudentStatus.DELETED
                                : StudentStatus.ACTIVE
                        }
                        getStatusColor={getStatusColor}
                    />
                    <div className="row-span-5">
                        <Tabs
                            orientation="vertical"
                            className="pt-3.5 grid grid-cols-4  min-h-[460px]"
                            defaultValue="studentInfo"
                        >
                            <StudentDetailTabslist
                                currentStatus={
                                    studentInfoData.user.deletedAt
                                        ? StudentStatus.DELETED
                                        : StudentStatus.ACTIVE
                                }
                                getButtonBasedOnStatus={getButtonBasedOnStatus}
                                deleteStudent={deleteStudent}
                            />
                            <div className="col-span-3 pr-6">
                                <StudentInformationTab
                                    studentInfoData={studentInfoData}
                                    currentDiscount={currentDiscount}
                                    setCurrentDiscount={setCurrentDiscount}
                                />
                                <StudentClassListTab
                                    studentClassesData={
                                        studentaCurrentClassesData
                                    }
                                    discount={studentInfoData.discount}
                                />
                                <DesiredClassTab
                                    studentId={studentInfoData.id}
                                    studentClassesData={
                                        studentDesiredClassesData
                                    }
                                />
                            </div>
                        </Tabs>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default StudentDetail;
