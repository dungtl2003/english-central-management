"use client";

import React, {ReactElement} from "react";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {Tabs} from "@/components/ui/tabs";
import StudentDetailHeader from "./student-detail-header";
import StudentDetailTabslist from "./student-detail-tabs-list";
import StudentInformationTab from "./student-information-components/student-information-tab";
import StudentClassListTab from "./class-list-components/class-list-tab";
import DesiredClassTab from "./desired-class-components/desired-class-tab";

// Đoạn này mô tả ý tưởng về việc nếu chưa được duyệt thì sẽ hiển thị nút nào
const status: string = "active"; // => trạng thái của học sinh
const getButtonBasedOnStatus = (currentStatus: string): ReactElement => {
    if (currentStatus === "active") {
        return (
            <>
                <Button
                    className="min-w-[85px] max-w-[85px]"
                    variant="destructive"
                >
                    Delete
                </Button>
            </>
        );
    }
    return (
        <Button className="min-w-[85px]" variant="default">
            Back to list
        </Button>
    );
};
// Đoạn này mô tả ý tưởng về việc hiển thị status như thế nào
const getStatusColor = (status: string): ReactElement => {
    switch (status) {
        case "active":
            return (
                <span className="ml-[5px] dark:text-green-400 text-green-600">
                    {" "}
                    Active
                </span>
            );
        case "deleted":
            return (
                <span className="ml-[5px] dark:text-red-500 text-red-600">
                    {" "}
                    Deleted
                </span>
            );
    }
    return <span>Error</span>;
};

// Đoạn này mô tả ý tưởng về việc copy vào clipboard
const studentId: string = "0123456789123456789132456789";

const StudentDetail = (): ReactElement => {
    return (
        <div className="w-[80%] min-h-[680px] pt-[90px]">
            <Card className="min-h-full">
                <div className="grid grid-rows-6">
                    <StudentDetailHeader
                        studentId={studentId}
                        status={status}
                        getStatusColor={getStatusColor}
                    />
                    <div className="row-span-5">
                        <Tabs
                            orientation="vertical"
                            className="pt-3.5 grid grid-cols-4  min-h-[460px]"
                            defaultValue="studentInfo"
                        >
                            <StudentDetailTabslist
                                currentStatus={status}
                                getButtonBasedOnStatus={getButtonBasedOnStatus}
                            />
                            <div className="col-span-3 pr-6">
                                <StudentInformationTab />
                                <StudentClassListTab />
                                <DesiredClassTab />
                            </div>
                        </Tabs>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default StudentDetail;
