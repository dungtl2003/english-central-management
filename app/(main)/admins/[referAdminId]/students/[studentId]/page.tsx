"use client";

import React, {
    ReactElement,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import StudentDetail from "./_components/student-detail";
import {
    InputType,
    OutputType,
} from "@/lib/action/admin/get-student-detail/types";
import {handler} from "@/lib/action/admin/get-student-detail";
import {UseActionOptions, useAction} from "@/hooks/use-action";
import {toast} from "@/components/ui/use-toast";
import {SkeletonStudentDetail} from "../_components/skeleton";

const StudentDetailPage = ({
    params,
}: {
    params: {studentId: string};
}): ReactElement => {
    const studentId = params.studentId;

    const [isLoading, setIsLoading] = useState(true);
    const [studentDetail, setStudentDetail] = useState<OutputType>();
    const fetchTeacherDetail = useCallback(handler, []);

    const event: UseActionOptions<OutputType> = useMemo(() => {
        return {
            onError: (error: string) => {
                console.log("Error: ", error);
                toast({
                    title: "error",
                    variant: "destructive",
                    description: "Get student detail failed",
                });
            },
            onSuccess: (data: OutputType) => {
                toast({
                    title: "Success",
                    variant: "success",
                    description: "Get student detail succeed",
                });
                setIsLoading(false);
                setStudentDetail(data);
            },
        };
    }, [setIsLoading]);

    const {execute} = useAction<InputType, OutputType>(
        fetchTeacherDetail,
        event
    );

    useEffect(() => {
        execute({studentId: studentId});
    }, [studentId, execute]);

    return (
        <div className="flex justify-center">
            {isLoading && <SkeletonStudentDetail />}
            {!isLoading && <StudentDetail studentDetail={studentDetail} />}
        </div>
    );
};

export default StudentDetailPage;
