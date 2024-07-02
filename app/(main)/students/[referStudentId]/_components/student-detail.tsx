"use client";

import React, {ReactElement, useState} from "react";
import {Card} from "@/components/ui/card";
import {Tabs} from "@/components/ui/tabs";
import StudentDetailHeader from "./student-detail-header";
import StudentDetailTabslist from "./student-detail-tabs-list";
import StudentInformationTab from "./student-information-components/student-information-tab";
// import {StudentClassesData, StudentDetailData} from "./types";
// import {OutputType as GetDetailOutputType} from "@/lib/action/admin/get-student-detail/types";
// import {handler} from "@/lib/action/admin/delete-student";
// import {UseActionOptions, useAction} from "@/hooks/use-action";
// import {OutputType as DeleteOutputType} from "@/lib/action/admin/delete-student/types";
// import {useToast} from "@/components/ui/use-toast";

// const formatData = (
//     data: GetDetailOutputType | undefined
// ): StudentDetailData | undefined => {
//     if (!data) return undefined;
//     const studentDesiredClasses: StudentClassesData[] = [];
//     const studentaCurrentClasses: StudentClassesData[] = [];
//     data.classes.forEach((element) => {
//         if (element.approvedAt && !element.rejectedAt)
//             studentaCurrentClasses.push(element as StudentClassesData);
//         if (!element.rejectedAt && !element.approvedAt)
//             studentDesiredClasses.push(element as StudentClassesData);
//     });

//     const student: StudentDetailData = {
//         studentInfoData: {
//             id: data.id,
//             discount: data.discount,
//             user: data.user,
//             parents: data.parents,
//         },
//         studentDesiredClassesData: studentDesiredClasses,
//         studentaCurrentClassesData: studentaCurrentClasses,
//     };
//     return student;
// };

const StudentDetail = (): ReactElement => {
    // const {
    //     studentInfoData,
    //     studentDesiredClassesData,
    //     studentaCurrentClassesData,
    // } = (formatData(studentDetail) as StudentDetailData) || null;
    const [currentDiscount] = useState<number>(0);

    return (
        <div className="w-[80%] min-h-[680px] pt-[90px]">
            <Card className="min-h-full">
                <div className="grid grid-rows-6">
                    <StudentDetailHeader
                        studentId={"3123123123123123123"}
                        firstName={"___"}
                        lastName={"___"}
                        imageUrl={""}
                    />
                    <div className="row-span-5">
                        <Tabs
                            orientation="vertical"
                            className="pt-3.5 grid grid-cols-4  min-h-[460px]"
                            defaultValue="studentInfo"
                        >
                            <StudentDetailTabslist />
                            <div className="col-span-3 pr-6">
                                <StudentInformationTab
                                    studentInfoData={undefined}
                                    currentDiscount={currentDiscount}
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
