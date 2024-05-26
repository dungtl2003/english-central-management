"use client";

import {ReactElement} from "react";
import TeacherNavigation from "./_components/teacher-navigation";

const TeachersLayout: React.FC<{children: React.ReactNode}> = ({
    children,
}): ReactElement => {
    return (
        <>
            <TeacherNavigation />
            {children}
        </>
    );
};

export default TeachersLayout;
