import React, {ReactElement} from "react";
import {Separator} from "@/components/ui/separator";
import {TabsList, TabsTrigger} from "@/components/ui/tabs";

interface TeacherDetailTabslistProps {
    currentStatus: string;
    getButtonBasedOnStatus: (currentStatus: string) => ReactElement;
}

const TeacherDetailTabslist = ({
    currentStatus,
    getButtonBasedOnStatus,
}: TeacherDetailTabslistProps): ReactElement => {
    return (
        <div className="col-span-1 pl-2 grid grid-cols-10">
            <TabsList className="col-span-9 grid grid-rows-11">
                <div>
                    <TabsTrigger
                        className="w-full text-left dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-slate-50 data-[state=active]:bg-slate-200 data-[state=active]:text-slate-950"
                        value="teacherInfo"
                    >
                        Teacher informations
                    </TabsTrigger>
                </div>
                <div>
                    <TabsTrigger
                        className="w-full text-left dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-slate-50 data-[state=active]:bg-slate-200 data-[state=active]:text-slate-950"
                        value="salaryDetail"
                    >
                        Salary detail
                    </TabsTrigger>
                </div>
                <div>
                    <TabsTrigger
                        className="w-full text-left dark:data-[state=active]:bg-slate-700 dark:data-[state=active]:text-slate-50 data-[state=active]:bg-slate-200 data-[state=active]:text-slate-950"
                        value="classList"
                    >
                        Class list
                    </TabsTrigger>
                </div>
                <div className="row-span-6"></div>
                <div className="row-span-2 flex items-center justify-evenly	">
                    {getButtonBasedOnStatus(currentStatus)}
                </div>
            </TabsList>
            <div className="flex justify-center pt-1">
                <Separator orientation="vertical" />
            </div>
        </div>
    );
};

export default TeacherDetailTabslist;
