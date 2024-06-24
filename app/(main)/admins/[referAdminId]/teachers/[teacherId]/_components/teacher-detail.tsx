"use client";

import React, {ReactElement, useState} from "react";

import {Card} from "@/components/ui/card";
import {Tabs} from "@/components/ui/tabs";
import InformationTab from "./teacher-information-components/teacher-information-tab";
import TeacherDetailHeader from "./teacher-detail-header";
import TeacherDetailTabslist from "./teacher-detail-tabs-list";
import ClassListTab from "./class-list-components/class-list-tab";
import SalaryDetailTab from "./salary-detail-components/salary-detail-tab";
import {OutputType as OutoutTypeGetTeacherDetai} from "@/lib/action/admin/get-teacher-detail/types";
import {ClassListData, SalaryDetailData, TeacherDetailData} from "../types";
import {format} from "date-fns";
import {TeacherStatus} from "@prisma/client";
import {LoadingUpdate} from "./loading-update-data";

function getMonthlySalary(baseSalary: number, acceptedAt: Date): number {
    return (
        baseSalary *
        (1 +
            (new Date().getFullYear() - new Date(acceptedAt).getFullYear()) /
                10)
    );
}

// Đoạn này mô tả ý tưởng về việc hiển thị status như thế nào
const getStatusColor = (status: string): ReactElement => {
    switch (status) {
        case "AVAILABLE":
            return (
                <span className="ml-[5px] dark:text-green-400 text-green-600">
                    {" "}
                    Available
                </span>
            );
        case "TEACHING":
            return (
                <span className="ml-[5px] dark:text-green-400 text-green-600">
                    {" "}
                    Teaching
                </span>
            );
        case "PENDING":
            return (
                <span className="ml-[5px] dark:text-yellow-400 text-yellow-600">
                    {" "}
                    Pending
                </span>
            );
        case "DELETED":
            return (
                <span className="ml-[5px] dark:text-red-500 text-red-600">
                    {" "}
                    Deleted
                </span>
            );
        case "REJECTED":
            return (
                <span className="ml-[5px] dark:text-red-500 text-red-600">
                    {" "}
                    Rejected
                </span>
            );
    }
    return <span>Error</span>;
};
// Đoạn này mô tả ý tưởng về việc copy vào clipboard
// const teacherId: string = "0123456789123456789132456789";

const formatData = (
    teacherDetail: OutoutTypeGetTeacherDetai | undefined
): TeacherDetailData | undefined => {
    if (!teacherDetail) return undefined;

    const classListDatas: ClassListData[] = [];
    const salaryDetailDatas: SalaryDetailData[] = [];

    teacherDetail.classes.forEach((element) => {
        const classListData: ClassListData = {
            classId: element.id,
            grade: element.unit.grade.toString(),
            index: element.index.toString(),
            startTime: format(element.startTime, "dd/MM/yyyy"),
            endTime: format(element.endTime, "dd/MM/yyyy"),
            year: element.unit.year.toString(),
            price: element.unit.pricePerSession.toString(),
        };
        classListDatas.push(classListData);
    });

    teacherDetail.monthlyPayments.forEach((element) => {
        const salaryDetailData: SalaryDetailData = {
            monhthlyPaymentId: element.id,
            salary: element.salary.toString(),
            month: element.month.toString(),
            year: element.year.toString(),
            paidAt: format(element.paidAt, "dd/MM/yyyy"),
        };
        salaryDetailDatas.push(salaryDetailData);
    });

    const teacher: TeacherDetailData = {
        status: teacherDetail.status,
        imageUrl: teacherDetail.user.imageUrl || "___",
        teacherId: teacherDetail.id,
        teacherInformationData: {
            firstName: teacherDetail.user.firstName || "___",
            lastName: teacherDetail.user.lastName || "___",
            role: teacherDetail.user.role || "___",
            email: teacherDetail.user.email,
            phoneNumber: teacherDetail.user.phoneNumber || "___",
            identityCard: teacherDetail.user.identifyCard || "___",
            gender: teacherDetail.user.gender || "___",
            baseSalary: teacherDetail.baseSalary.toString(),
            monthlySalary: teacherDetail.acceptedAt
                ? getMonthlySalary(
                      Number(teacherDetail.baseSalary),
                      teacherDetail.acceptedAt
                  ).toString()
                : "0",
            birthday: teacherDetail.user.birthday
                ? format(teacherDetail.user.birthday, "dd/MM/yyyy")
                : "___",
            createDate: format(teacherDetail.user.createdAt, "dd/MM/yyyy"),
            acceptDate: teacherDetail.acceptedAt
                ? format(teacherDetail.acceptedAt, "dd/MM/yyyy")
                : "___",
        },
        salaryDetailDatas: salaryDetailDatas,
        classListDatas: classListDatas,
    };

    return teacher;
};

const TeacherDetail = ({
    teacherDetail,
}: {
    teacherDetail: OutoutTypeGetTeacherDetai | undefined;
}): ReactElement => {
    const teacher: TeacherDetailData | undefined = formatData(teacherDetail);

    const [baseSalary, setBaseSalary] = useState(
        teacher?.teacherInformationData.baseSalary as string
    );
    const [monthlySalary, setMonthlySalary] = useState(
        teacher?.teacherInformationData.monthlySalary as string
    );
    const [isStatusUpdating, setIsStatusUpdating] = useState(false);

    return (
        <div className="w-[75%] min-h-[680px] pt-[90px]">
            <Card className="min-h-full">
                <div className="grid grid-rows-6">
                    <TeacherDetailHeader
                        teacherId={teacher?.teacherId as string}
                        firstName={
                            teacher?.teacherInformationData.firstName || "___"
                        }
                        lastName={
                            teacher?.teacherInformationData.lastName || "___"
                        }
                        imageUrl={teacher?.imageUrl || "___"}
                        status={teacher?.status as string}
                        getStatusColor={getStatusColor}
                    />
                    <div className="row-span-5">
                        <Tabs
                            orientation="vertical"
                            className="pt-3.5 grid grid-cols-4  min-h-[460px]"
                            defaultValue="teacherInfo"
                        >
                            <TeacherDetailTabslist
                                currentStatus={teacher?.status as string}
                                teacherId={teacher?.teacherId as string}
                                setIsStatusUpdating={setIsStatusUpdating}
                            />
                            <div className="col-span-3 pr-6">
                                <InformationTab
                                    teacherInformationData={
                                        teacher?.teacherInformationData
                                    }
                                    baseSalary={baseSalary}
                                    monthlySalary={monthlySalary}
                                />
                                <SalaryDetailTab
                                    teacherId={teacher?.teacherId as string}
                                    salaryDetailDatas={
                                        teacher?.salaryDetailDatas
                                    }
                                    teacherStatus={
                                        teacher?.status as TeacherStatus
                                    }
                                    acceptDate={
                                        teacher?.teacherInformationData
                                            .acceptDate as string
                                    }
                                    baseSalary={baseSalary}
                                    setBaseSalary={setBaseSalary}
                                    monthlySalary={monthlySalary}
                                    setMonthlySalary={setMonthlySalary}
                                />
                                <ClassListTab
                                    classListDatas={teacher?.classListDatas}
                                />
                            </div>
                        </Tabs>
                    </div>
                </div>
            </Card>
            {isStatusUpdating && <LoadingUpdate />}
        </div>
    );
};

export default TeacherDetail;
