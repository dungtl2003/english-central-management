"use client";
import {ReactElement} from "react";

const StudentsLayout: React.FC<{children: React.ReactNode}> = ({
    children,
}): ReactElement => {
    return <>{children}</>;
};

export default StudentsLayout;
