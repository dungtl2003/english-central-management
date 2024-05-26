"use client";

import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import React, {ReactElement} from "react";
import ClassDetailHeader from "./_components/class-header";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import OverviewCard from "./_components/overview-card";

const page = (): ReactElement => {
    return (
        <div className="flex justify-center">
            <div className="w-[80%] pt-[100px]">
                <ClassDetailHeader />
                <Tabs defaultValue="overview" className="mt-[15px] w-full">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="classList">Class list</TabsTrigger>
                        <TabsTrigger value="classAttendance">
                            Attendance
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                        <OverviewCard />
                        <div className="pt-5 grid grid-cols-5 gap-x-5">
                            <div className="col-span-2">
                                <Card className="">
                                    <CardHeader className="text-2xl font-semibold">
                                        Class information
                                    </CardHeader>
                                    <CardContent className="">
                                        <div className="pb-3 grid grid-cols-4 items-center gap-x-3">
                                            <Label
                                                htmlFor="className"
                                                className="text-left"
                                            >
                                                Class name
                                            </Label>
                                            <Input
                                                id="className"
                                                value="3.1"
                                                className="col-span-3"
                                                disabled
                                            />
                                        </div>
                                        <div className="pb-3 grid grid-cols-4 items-center gap-x-3">
                                            <Label
                                                htmlFor="grade"
                                                className="text-left"
                                            >
                                                Grade
                                            </Label>
                                            <Input
                                                id="grade"
                                                value="3"
                                                className="col-span-3"
                                                disabled
                                            />
                                        </div>
                                        <div className="pb-3 grid grid-cols-4 items-center gap-x-3">
                                            <Label
                                                htmlFor="startDate"
                                                className="text-left"
                                            >
                                                Start date
                                            </Label>
                                            <Input
                                                id="startDate"
                                                value="01/01/2024"
                                                className="col-span-3"
                                                disabled
                                            />
                                        </div>
                                        <div className="pb-3 grid grid-cols-4 items-center gap-x-3">
                                            <Label
                                                htmlFor="endDate"
                                                className="text-left"
                                            >
                                                End date
                                            </Label>
                                            <Input
                                                id="endDate"
                                                value="01/02/2024"
                                                className="col-span-3"
                                                disabled
                                            />
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                            <div className="col-span-3">
                                <Card className="">
                                    <CardContent className=""></CardContent>
                                </Card>
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="classList">
                        This is class detail list
                    </TabsContent>
                    <TabsContent value="classAttendance">
                        This is class attendance
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default page;
