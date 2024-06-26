import React, {ReactElement} from "react";
import {Card, CardContent, CardHeader} from "@/components/ui/card";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {OutputType} from "@/lib/action/teacher/get-class-detail/types";
import ClassChart from "./class-chart";
import {ClassBasicInfoData} from "./types";
import {format} from "date-fns";

const formatData = (data: OutputType | undefined): ClassBasicInfoData => {
    return {
        className: data ? `${data.unit.grade}.${data.index}` : "",
        grade: data ? String(data.unit.grade) : "",
        startDate: data ? format(data.startTime, "dd/MM/yyyy") : "",
        endDate: data ? format(data.endTime, "dd/MM/yyyy") : "",
        timeZone: data ? data.timeZone : "",
    };
};

const ClassBasicInfomation: React.FC<{data: OutputType | undefined}> = ({
    data,
}): ReactElement => {
    const formattedData: ClassBasicInfoData = formatData(data);

    return (
        <div className="pt-5 grid grid-cols-5 gap-x-5">
            <div className="col-span-2">
                <Card className="min-h-[340px] max-h-[340px]">
                    <CardHeader className="text-2xl font-semibold">
                        Class information
                    </CardHeader>
                    <CardContent className="">
                        <div className="pb-3 grid grid-cols-4 items-center gap-x-3">
                            <Label htmlFor="className" className="text-left">
                                Class name
                            </Label>
                            <Input
                                id="className"
                                value={formattedData.className}
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
                                value={formattedData.grade}
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
                                value={formattedData.startDate}
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
                                value={formattedData.endDate}
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
                                value={formattedData.timeZone}
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
                        <ClassChart rawData={data} />
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default ClassBasicInfomation;
