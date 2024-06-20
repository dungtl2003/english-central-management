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

const TeacherDetailPage = ({
    params,
}: {
    params: {
        teacherId: string;
        referAdminId: string;
    };
}) => {
    const teacherId = params.teacherId;
    const referAdminId = params.referAdminId;

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
                setTeacherDetail(data);
            },
        };
    }, []);

    const {execute} = useAction<InputType, OutputType>(
        fetchTeacherDetail,
        event
    );

    useEffect(() => {
        execute({teacherId: teacherId, referAdminId: referAdminId}).then(() =>
            setIsLoading(false)
        );
    }, [teacherId, execute, setIsLoading, referAdminId]);

    return (
        <div className="flex justify-center">
            {isLoading && <SkeletonTeacherDetail />}
            {!isLoading && <TeacherDetail teacherDetail={teacherDetail} />}
        </div>
    );
};

export default TeacherDetailPage;
