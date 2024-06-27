"use client";

import React, {ReactElement} from "react";
import {Card} from "@/components/ui/card";
import {Tabs} from "@/components/ui/tabs";
import ParentDetailHeader from "./parent-detail-header";
import ParentDetailTabslist from "./student-detail-tabs-list";
import ParentInformationTab from "./parent-information-tab";

// Đoạn này mô tả ý tưởng về việc copy vào clipboard
const studentId: string = "0123456789123456789132456789";

const ParentDetail = (): ReactElement => {
    return (
        <div className="w-[80%] min-h-[680px] pt-[90px]">
            <Card className="min-h-full">
                <div className="grid grid-rows-6">
                    <ParentDetailHeader studentId={studentId} />
                    <div className="row-span-5">
                        <Tabs
                            orientation="vertical"
                            className="pt-3.5 grid grid-cols-4 min-h-[460px]"
                            defaultValue="parentInfo"
                        >
                            <ParentDetailTabslist />
                            <div className="col-span-3 pr-6">
                                <ParentInformationTab />
                            </div>
                        </Tabs>
                    </div>
                </div>
            </Card>
        </div>
    );
};

export default ParentDetail;
