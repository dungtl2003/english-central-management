"use client";

import {ReactElement, useEffect} from "react";
import TeacherNavigation from "./_components/teacher-navigation";
import {useAuth} from "@clerk/nextjs";
import {useRouter} from "next/navigation";

const TeachersLayout: React.FC<{
    children: React.ReactNode;
    params: {teacherId: string};
}> = ({children, params}): ReactElement => {
    const {userId, isLoaded} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoaded) return;

        const teacherId = params.teacherId;
        if (teacherId !== userId) {
            router.push("/404");
        }
    }, [isLoaded, params.teacherId, userId, router]);

    return (
        <>
            <TeacherNavigation />
            {children}
        </>
    );
};

export default TeachersLayout;
