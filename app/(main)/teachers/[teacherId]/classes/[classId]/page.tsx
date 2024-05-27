"use client";

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import React, {ReactElement} from "react";
import ClassDetailHeader from "./_components/class-detail-header";
import TabOverview from "./_components/tab-overview";
import TabClassList from "./_components/tab-class-list";

const page = (): ReactElement => {
    return (
        <div className="flex justify-center">
            <div className="w-[80%] pt-[80px]">
                <ClassDetailHeader />
                <Tabs defaultValue="overview" className="mt-[15px] w-full">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="classList">Class list</TabsTrigger>
                        <TabsTrigger value="classAttendance">
                            Attendance
                        </TabsTrigger>
                    </TabsList>
                    <TabOverview />
                    <TabClassList />
                    <TabsContent value="classAttendance">
                        This is class attendance
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default page;
