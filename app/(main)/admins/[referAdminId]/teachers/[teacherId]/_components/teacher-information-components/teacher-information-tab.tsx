import React, {ReactElement} from "react";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {TabsContent} from "@/components/ui/tabs";
import {CalendarIcon} from "lucide-react";
import {TeacherInformationData} from "../../types";

const InformationTab = ({
    teacherInformationData,
    baseSalary,
    monthlySalary,
}: {
    teacherInformationData: TeacherInformationData | undefined;
    baseSalary: string;
    monthlySalary: string;
}): ReactElement => {
    return (
        <TabsContent value="teacherInfo">
            <div className="pl-1 grid grid-rows-4 gap-y-6">
                <div className="grid grid-cols-3 gap-x-4">
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="pl-1 text-[14px]">First name</Label>
                        <Input
                            type="text"
                            value={teacherInformationData?.firstName}
                            readOnly
                        />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="pl-1 text-[14px]">Last name</Label>
                        <Input
                            type="text"
                            value={teacherInformationData?.lastName}
                            readOnly
                        />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="pl-1 text-[14px]">Role</Label>
                        <Input
                            type="text"
                            value={teacherInformationData?.role}
                            readOnly
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-x-4">
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="pl-1 text-[14px]">Email</Label>
                        <Input
                            type="text"
                            value={teacherInformationData?.email}
                            readOnly
                        />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="pl-1 text-[14px]">Phone number</Label>
                        <Input
                            type="text"
                            value={teacherInformationData?.phoneNumber}
                            readOnly
                        />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="pl-1 text-[14px]">
                            Identity card
                        </Label>
                        <Input
                            type="text"
                            value={teacherInformationData?.identityCard}
                            readOnly
                        />
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-x-4">
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="pl-1 text-[14px]">Gender</Label>
                        <Input
                            type="text"
                            value={teacherInformationData?.gender}
                            readOnly
                        />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="pl-1 text-[14px]">
                            Base salary{" "}
                            <span className="text-slate-400">($)</span>
                        </Label>
                        <Input type="text" value={baseSalary} readOnly />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="pl-1 text-[14px]">
                            Monthly salary{" "}
                            <span className="text-slate-400">($)</span>
                        </Label>
                        <Input type="text" value={monthlySalary} readOnly />
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
                        <Input
                            type="text"
                            value={teacherInformationData?.birthday}
                            readOnly
                        />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="pl-1 flex flex-row items-center text-[14px]">
                            Create date
                            <span className="ml-1">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                            </span>
                        </Label>
                        <Input
                            type="text"
                            value={teacherInformationData?.createDate}
                            readOnly
                        />
                    </div>
                    <div className="grid w-full items-center gap-1.5">
                        <Label className="pl-1 flex flex-row items-center text-[14px]">
                            Accept date
                            <span className="ml-1">
                                <CalendarIcon className="mr-2 h-4 w-4" />
                            </span>
                        </Label>
                        <Input
                            type="text"
                            value={teacherInformationData?.acceptDate as string}
                            readOnly
                        />
                    </div>
                </div>
            </div>
        </TabsContent>
    );
};

export default InformationTab;
