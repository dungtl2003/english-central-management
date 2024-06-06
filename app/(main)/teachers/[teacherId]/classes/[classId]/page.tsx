"use client";

import React, {
    ReactElement,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import {UseActionOptions, useAction} from "@/hooks/use-action";
import {handler} from "@/lib/action/teacher/get-class-detail";
import {OutputType} from "@/lib/action/teacher/get-class-detail/types";
import {toast} from "@/components/ui/use-toast";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs";
import TabOverview from "./_components/tab-overview";
import TabAttendanceHistory from "./_components/tab-attendance";
import {format} from "date-fns";
import {Calendar as CalendarIcon} from "lucide-react";
import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";
import {SkeletonClassDetailTabList} from "../../_components/skeleton-teacher";
import TabClassList from "./_components/tab-student-list";

const ClassDetailPage: React.FC<{
    params: {teacherId: string; classId: string};
}> = ({params}): ReactElement => {
    const getDetailHandler = useCallback(handler, []);
    const event: UseActionOptions<OutputType> = useMemo(() => {
        return {
            onError: (error: string) => {
                console.log("Error: ", error);
                toast({
                    title: "error",
                    variant: "destructive",
                    description: "Get class's detail failed",
                });
            },
        };
    }, []);
    const {data, execute} = useAction(getDetailHandler, event);

    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        execute({teacherId: params.teacherId, classId: params.classId}).then(
            () => setIsLoading(false)
        );
    }, [execute, params.teacherId, params.classId]);

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
                        {isLoading && <SkeletonClassDetailTabList />}
                        {!isLoading && (
                            <>
                                <TabsTrigger value="overview">
                                    Overview
                                </TabsTrigger>
                                <TabsTrigger value="studentList">
                                    Student list
                                </TabsTrigger>
                                <TabsTrigger value="attendanceHistory">
                                    Attendance
                                </TabsTrigger>
                            </>
                        )}
                    </TabsList>
                    <TabOverview data={data} isLoading={isLoading} />
                    <TabClassList data={data} />
                    <TabAttendanceHistory data={data} />
                </Tabs>
            </div>
        </div>
    );
};

export default ClassDetailPage;
