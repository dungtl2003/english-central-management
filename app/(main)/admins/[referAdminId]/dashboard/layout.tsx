"use client";
import {ReactElement} from "react";

const DashboardLayout: React.FC<{children: React.ReactNode}> = ({
    children,
}): ReactElement => {
    return <>{children}</>;
};

export default DashboardLayout;
