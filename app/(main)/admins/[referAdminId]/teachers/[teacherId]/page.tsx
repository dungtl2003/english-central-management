"use client";

import React, {useCallback, useEffect, useMemo, useState} from "react";
import TeacherDetail from "./_components/teacher-detail";
import {SkeletonTeacherDetail} from "../_components/skeleton";
import {handler} from "@/lib/action/admin/get-teacher-detail";
import {UseActionOptions, useAction} from "@/hooks/use-action";
import {
    InputType,
    OutputType,
} from "@/lib/action/admin/get-teacher-detail/types";
import {toast} from "@/components/ui/use-toast";

const TeacherDetailPage = ({params}: {params: {teacherId: string}}) => {
    const teacherId = params.teacherId;

    const [isLoading, setIsLoading] = useState(true);
    const [teacherDetail, setTeacherDetail] = useState<OutputType>();
    const fetchTeacherDetail = useCallback(handler, []);
    const event: UseActionOptions<OutputType> = useMemo(() => {
        return {
            onError: (error: string) => {
                console.log("Error: ", error);
                toast({
                    title: "error",
                    variant: "destructive",
                    description: "Get teacher detail failed",
                });
            },
            onSuccess: (data: OutputType) => {
                setIsLoading(false);
                setTeacherDetail(data);
            },
        };
    }, [setIsLoading]);

    const {execute} = useAction<InputType, OutputType>(
        fetchTeacherDetail,
        event
    );

    useEffect(() => {
        execute({teacherId: teacherId});
    }, [teacherId, execute]);

    return (
        <div className="flex justify-center">
            {isLoading && <SkeletonTeacherDetail />}
            {!isLoading && <TeacherDetail teacherDetail={teacherDetail} />}
        </div>
    );
};

export default TeacherDetailPage;
