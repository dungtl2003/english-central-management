import React, {ReactElement} from "react";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import ClassChart from "./class-chart";

const ClassBasicInfomation = (): ReactElement => {
    return (
        <div className="pt-5 grid grid-cols-5 gap-x-5">
            <div className="col-span-2">
                <Card className="min-h-[340px] max-h-[340px]">
                    <CardHeader className="text-2xl font-semibold">
                        Class information
                    </CardHeader>
                    <CardContent className="px-4">
                        <div className="pb-3 grid grid-cols-4 items-center gap-x-3">
                            <Label htmlFor="className" className="text-left">
                                Class name
                            </Label>
                            <Input
                                id="className"
                                value="3.1"
                                className="col-span-3"
                                readOnly
                            />
                        </div>
                        <div className="pb-3 grid grid-cols-4 items-center gap-x-3">
                            <Label htmlFor="grade" className="text-left">
                                Grade
                            </Label>
                            <Input
                                id="grade"
                                value="3"
                                className="col-span-3"
                                readOnly
                            />
                        </div>
                        <div className="pb-3 grid grid-cols-4 items-center gap-x-3">
                            <Label htmlFor="startDate" className="text-left">
                                Start date
                            </Label>
                            <Input
                                id="startDate"
                                value="01/01/2024"
                                className="col-span-3"
                                readOnly
                            />
                        </div>
                        <div className="pb-3 grid grid-cols-4 items-center gap-x-3">
                            <Label htmlFor="endDate" className="text-left">
                                End date
                            </Label>
                            <Input
                                id="endDate"
                                value="01/02/2024"
                                className="col-span-3"
                                readOnly
                            />
                        </div>
                        <div className="pb-3 grid grid-cols-4 items-center gap-x-3">
                            <Label htmlFor="timeZone" className="text-left">
                                Time zone
                            </Label>
                            <Input
                                id="timeZone"
                                value="Ho Chi Minh"
                                className="col-span-3"
                                readOnly
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>
            <div className="col-span-3 ">
                <Card className="min-h-[340px] max-h-[340px]">
                    <CardContent className="flex justify-center items-center">
                        <ClassChart />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ClassBasicInfomation;
