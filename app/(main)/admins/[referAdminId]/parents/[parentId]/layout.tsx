"use client";

import {ReactElement} from "react";

const ParentDetailLayout: React.FC<{children: React.ReactNode}> = ({
    children,
}): ReactElement => {
    return <>{children}</>;
};

export default ParentDetailLayout;
