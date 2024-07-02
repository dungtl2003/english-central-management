"use client";

import React, {ReactElement} from "react";
import {Card} from "@/components/ui/card";
import {Tabs} from "@/components/ui/tabs";
import StudentDetailHeader from "./student-detail-header";
import StudentDetailTabslist from "./student-detail-tabs-list";
import StudentInformationTab from "./student-information-components/student-information-tab";
import {OutputType} from "@/lib/action/admin/get-student-detail/types";

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

const StudentDetail = ({
    studentDetail,
}: {
    studentDetail: OutputType | undefined;
}): ReactElement => {
    return (
        <div className="w-[80%] min-h-[680px] pt-[90px]">
            <Card className="min-h-full">
                <div className="grid grid-rows-6">
                    <StudentDetailHeader
                        studentId={studentDetail?.id || "___"}
                        firstName={studentDetail?.user.firstName || "___"}
                        lastName={studentDetail?.user.lastName || "___"}
                        imageUrl={studentDetail?.user.imageUrl}
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
                                    studentInfoData={
                                        studentDetail || {
                                            discount: 0,
                                            id: "___",
                                            parents: [],
                                            user: {
                                                id: "___",
                                                referId: "___",
                                                email: "___",
                                                createdAt: new Date(),
                                                role: "STUDENT",
                                                birthday: null,
                                                deletedAt: null,
                                                firstName: null,
                                                gender: null,
                                                identifyCard: null,
                                                imageUrl: null,
                                                lastName: null,
                                                phoneNumber: null,
                                                updatedAt: null,
                                            },
                                        }
                                    }
                                    currentDiscount={
                                        studentDetail?.discount || 0
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
