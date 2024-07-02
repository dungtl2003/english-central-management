"use client";

import {ReactElement, useCallback, useEffect, useMemo, useState} from "react";
import StudentDetail from "./_components/student-detail";
import {handler as handlerGetUserId} from "@/lib/action/get-user-id";
import {
    InputType,
    OutputType,
} from "@/lib/action/admin/get-student-detail/types";
import {UseActionOptions, useAction} from "@/hooks/use-action";
import {handler} from "@/lib/action/admin/get-student-detail";
import {toast} from "@/components/ui/use-toast";
import {SkeletonStudentDetail} from "./_components/skeleton";

const StudentsPage = (): ReactElement => {
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingStudentId, setIsLoadingStudentId] = useState(true);

    const [studentId, setStudentId] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            await handlerGetUserId().then((value) => {
                setStudentId(value.data as string);
                setIsLoadingStudentId(false);
            });
        };
        fetchData();
    }, []);

    const [studentDetail, setStudentDetail] = useState<OutputType>();
    const fetchStudentDetail = useCallback(handler, []);
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
                toast({
                    title: "Success",
                    variant: "success",
                    description: "Get teacher detail succeed",
                });
                setIsLoading(false);
                setStudentDetail(data);
            },
        };
    }, [setIsLoading]);

    const {execute} = useAction<InputType, OutputType>(
        fetchStudentDetail,
        event
    );

    useEffect(() => {
        if (isLoadingStudentId) return;
        execute({studentId: studentId});
    }, [studentId, execute, isLoadingStudentId]);

    return (
        <>
            <div className="flex justify-center">
                {isLoading && <SkeletonStudentDetail />}
                {!isLoading && <StudentDetail studentDetail={studentDetail} />}
            </div>
        </>
    );
};

export default StudentsPage;
