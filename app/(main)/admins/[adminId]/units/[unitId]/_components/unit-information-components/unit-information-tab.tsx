import React, {ReactElement} from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {TabsContent} from "@/components/ui/tabs";
import {CalendarIcon} from "lucide-react";

const StudentInformationTab = (): ReactElement => {
    return (
        <TabsContent value="unitInfo">
            <div className="pl-1 grid grid-cols-2 grid-rows-5 gap-x-4 gap-y-4">
                <div className="grid w-full items-center gap-1.5">
                    <Label className="pl-1 text-[14px]">Year</Label>
                    <Input type="text" value={"2024"} readOnly />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label className="pl-1 text-[14px]">Grade</Label>
                    <Input type="text" value={"1"} readOnly />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label className="pl-1 text-[14px]">Max sessions</Label>
                    <Input type="text" value={"50"} readOnly />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label className="pl-1 text-[14px]">Max students</Label>
                    <Input type="text" value={"45"} readOnly />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label className="pl-1 text-[14px]">Study time</Label>
                    <div className="grid grid-cols-11">
                        <div className="col-span-3">
                            <Input
                                className="dark:text-white text-black text-right appearance-none"
                                value={"02"}
                                readOnly
                            />
                        </div>
                        <div className="col-span-1 flex items-center justify-center text-xl font-bold">
                            :
                        </div>
                        <div className="col-span-3">
                            <Input
                                className="dark:text-white text-black text-right appearance-none"
                                value={"30"}
                                readOnly
                            />
                        </div>
                        <div className="col-span-1 flex items-center justify-center text-xl font-bold">
                            :
                        </div>
                        <div className="col-span-3">
                            <Input
                                className="dark:text-white text-black text-right appearance-none"
                                value={"00"}
                                readOnly
                            />
                        </div>
                    </div>
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label className="pl-1 flex flex-row items-center text-[14px]">
                        Price per session{" "}
                        <span className="ml-1 text-slate-400">($)</span>
                    </Label>
                    <Input type="text" value={"7$"} readOnly />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label className="pl-1 flex flex-row items-center text-[14px]">
                        Create date
                        <span className="ml-1 text-slate-400">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                        </span>
                    </Label>
                    <Input type="text" value={"01/01/2024"} readOnly />
                </div>
                <div className="grid w-full items-center gap-1.5">
                    <Label className="pl-1 flex flex-row items-center text-[14px]">
                        Update date
                        <span className="ml-1 text-slate-400">
                            <CalendarIcon className="mr-2 h-4 w-4" />
                        </span>
                    </Label>
                    <Input type="text" value={"22/05/2024"} readOnly />
                </div>
            </div>
        </TabsContent>
    );
};

export default StudentInformationTab;
