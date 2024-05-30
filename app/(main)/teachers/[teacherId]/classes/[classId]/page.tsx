"use client";

import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {ReactElement} from "react";
import TabOverview from "./_components/tab-overview";
import TabClassList from "./_components/tab-class-list";
import TabAttendanceHistory from "./_components/tab-attendance";
import * as React from "react";
import {format} from "date-fns";
import {Calendar as CalendarIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";

const page = (): ReactElement => {
    return (
        <div className="flex justify-center">
            <div className="w-[80%] pt-[80px]">
                <div className="flex flex-row items-center">
                    <span className="text-4xl font-semibold">Class Detail</span>
                    <div className="flex flex-row items-center ml-auto gap-x-2">
                        <Button
                            variant={"outline"}
                            className={cn(
                                "w-[200px] justify-start text-left font-normal"
                            )}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {format(new Date(), "PPP")}
                        </Button>
                    </div>
                </div>
                <Tabs defaultValue="overview" className="mt-[15px] w-full">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="classList">Class list</TabsTrigger>
                        <TabsTrigger value="attendanceHistory">
                            Attendance
                        </TabsTrigger>
                    </TabsList>
                    <TabOverview />
                    <TabClassList />
                    <TabAttendanceHistory />
                </Tabs>
            </div>
        </div>
    );
};

export default page;
