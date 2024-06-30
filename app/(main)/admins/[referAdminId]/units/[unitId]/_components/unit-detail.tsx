"use client";

import React, {ReactElement} from "react";
import {Button} from "@/components/ui/button";
import {Card} from "@/components/ui/card";
import {Tabs} from "@/components/ui/tabs";
import StudentDetailHeader from "./unit-detail-header";
import StudentDetailTabslist from "./unit-detail-tabs-list";
import StudentInformationTab from "./unit-information-components/unit-information-tab";
import StudentClassListTab from "./class-list-components/class-list-tab";
import Link from "next/link";

const hasClass: boolean = true;
const getButtonBasedOnStatus = (hasClass: boolean): ReactElement => {
    if (!hasClass) {
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
        <Link href={"/admins/1/units"}>
            <Button className="min-w-[85px]" variant="default">
                Back to list
            </Button>
        </Link>
    );
};

// Đoạn này mô tả ý tưởng về việc copy vào clipboard
const studentId: string = "0123456789123456789132456789";

const UnitDetail = (): ReactElement => {
    return (
        <div className="w-[80%] min-h-[680px] pt-[90px]">
            <Card className="min-h-full">
                <div className="grid grid-rows-6">
                    <StudentDetailHeader studentId={studentId} />
                    <div className="row-span-5">
                        <Tabs
                            orientation="vertical"
                            className="pt-3.5 grid grid-cols-4  min-h-[460px]"
                            defaultValue="unitInfo"
                        >
                            <StudentDetailTabslist
                                hasClass={hasClass}
                                getButtonBasedOnStatus={getButtonBasedOnStatus}
                            />
                            <div className="col-span-3 pr-6">
                                <StudentInformationTab />
                                <StudentClassListTab />
                            </div>
                        </Tabs>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default UnitDetail;
