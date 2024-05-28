"use client";

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import React, {ReactElement, useCallback, useEffect, useMemo} from "react";
import ClassDetailHeader from "./_components/class-detail-header";
import TabOverview from "./_components/tab-overview";
import TabClassList from "./_components/tab-class-list";
import {UseActionOptions, useAction} from "@/hooks/use-action";
import {handler} from "@/lib/action/teacher/get-class-detail";
import {OutputType} from "@/lib/action/teacher/get-class-detail/types";
import {toast} from "@/components/ui/use-toast";

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
    const {data, execute, isLoading} = useAction(getDetailHandler, event);

    useEffect(() => {
        function fetchData() {
            execute({teacherId: params.teacherId, classId: params.classId});
        }

        fetchData();
    }, [isLoading, execute, params.teacherId, params.classId]);

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
                    <TabOverview data={data} />
                    <TabClassList />
                    <TabsContent value="classAttendance">
                        This is class attendance
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default ClassDetailPage;
