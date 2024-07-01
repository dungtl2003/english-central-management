"use client";

import {ReactElement} from "react";
import ParentNavigation from "./parent-navigation";
// import TeacherNavigation from "./_components/teacher-navigation";
// import {useAuth} from "@clerk/nextjs";
// import {UseActionOptions, useAction} from "@/hooks/use-action";
// import {handler} from "@/lib/action/teacher/get-teacher-detail";
// import {OutputType} from "@/lib/action/teacher/get-teacher-detail/types";
// import {useRouter} from "next/navigation";

const ParentsLayout: React.FC<{
    children: React.ReactNode;
    // params: {teacherId: string};
}> = ({children}): ReactElement => {
    // const {userId: referUserId, isLoaded, isSignedIn} = useAuth();
    // const router = useRouter();
    // const referTeacherId = params.teacherId;
    // const memoEvent = useMemo(() => {
    //     return {} as UseActionOptions<OutputType>;
    // }, []);
    // const fetchTeacherHandler = useCallback(handler, []);
    // const {data, execute} = useAction(fetchTeacherHandler, memoEvent);

    // useEffect(() => {
    //     if (
    //         !isLoaded ||
    //         !isSignedIn ||
    //         !referUserId ||
    //         referUserId !== referTeacherId
    //     )
    //         return;

    //     execute({referTeacherId: referTeacherId});
    // }, [isLoaded, referTeacherId, execute, referUserId, isSignedIn]);

    // useEffect(() => {
    //     if (!isLoaded || !referUserId) return;

    //     if (referUserId !== referTeacherId) {
    //         router.push("/404");
    //     }
    // }, [isLoaded, referTeacherId, referUserId, router]);

    return (
        <>
            <ParentNavigation />
            {children}
        </>
    );
};

export default ParentsLayout;
