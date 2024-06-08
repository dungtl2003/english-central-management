"use client";

import {ReactElement, useCallback, useEffect} from "react";
import TeacherNavigation from "./_components/teacher-navigation";
import {useAuth} from "@clerk/nextjs";
import {useRouter} from "next/navigation";
import {useAction} from "@/hooks/use-action";
import {handler} from "@/lib/action/teacher/get-teacher-detail";

const event = {};

const TeachersLayout: React.FC<{
    children: React.ReactNode;
    params: {teacherId: string};
}> = ({children, params}): ReactElement => {
    const {userId, isLoaded} = useAuth();
    const router = useRouter();
    const fetchTeacherHandler = useCallback(handler, []);
    const {data, execute} = useAction(fetchTeacherHandler, event);

    useEffect(() => {
        if (!isLoaded) return;

        execute({teacherId: params.teacherId});
    }, [isLoaded, params.teacherId, execute]);

    useEffect(() => {
        if (!isLoaded) return;

        const teacherId = params.teacherId;
        if (teacherId !== userId) {
            router.push("/404");
        }
    }, [isLoaded, params.teacherId, userId, router]);

    return (
        <>
            <TeacherNavigation data={data} />
            {children}
        </>
    );
};

export default TeachersLayout;
