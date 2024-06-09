import React, {ReactElement} from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {TabsContent} from "@/components/ui/tabs";
import {CalendarIcon} from "lucide-react";

const InformationTab = (): ReactElement => {
    return (
        <TabsContent value="teacherInfo">
            <div className="pl-1 grid grid-rows-4 gap-y-6">
                <div className="grid grid-cols-3 gap-x-4">
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="pl-1 text-[14px]">First name</Label>
                        <Input type="text" value={"Đức"} readOnly />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="pl-1 text-[14px]">Last name</Label>
                        <Input type="text" value={"Nguyễn Minh"} readOnly />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="pl-1 text-[14px]">Role</Label>
                        <Input type="text" value={"Teacher"} readOnly />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-x-4">
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="pl-1 text-[14px]">Email</Label>
                        <Input
                            type="text"
                            value={"nmd.ecm@gmail.com"}
                            readOnly
                        />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="pl-1 text-[14px]">Phone number</Label>
                        <Input type="text" value={"0123 456 789"} readOnly />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="pl-1 text-[14px]">
                            Identity card
                        </Label>
                        <Input type="text" value={"0000 1111 2222"} readOnly />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-x-4">
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="pl-1 text-[14px]">Gender</Label>
                        <Input type="text" value={"Male"} readOnly />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="pl-1 text-[14px]">
                            Base salary{" "}
                            <span className="text-slate-400">($)</span>
                        </Label>
                        <Input type="text" value={"100$"} readOnly />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="pl-1 text-[14px]">
                            Monthly salary{" "}
                            <span className="text-slate-400">($)</span>
                        </Label>
                        <Input type="text" value={"500$"} readOnly />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-x-4">
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="pl-1 flex flex-row items-center text-[14px]">
                            Birthday
                            <span className="ml-1">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                            </span>
                        </Label>
                        <Input type="text" value={"19/01/2003"} readOnly />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="pl-1 flex flex-row items-center text-[14px]">
                            Create date
                            <span className="ml-1">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                            </span>
                        </Label>
                        <Input type="text" value={"22/05/2023"} readOnly />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="pl-1 flex flex-row items-center text-[14px]">
                            Accept date
                            <span className="ml-1">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                            </span>
                        </Label>
                        <Input type="text" value={"22/05/2023"} readOnly />
                    </div>
                </div>
            </div>
        </TabsContent>
    );
};

export default InformationTab;
