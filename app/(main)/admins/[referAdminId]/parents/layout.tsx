"use client";
import {ReactElement} from "react";

const ParentsLayout: React.FC<{children: React.ReactNode}> = ({
    children,
}): ReactElement => {
    return <>{children}</>;
};

export default ParentsLayout;
