"use client";

import {ReactElement} from "react";

const UserProfileLayout: React.FC<{children: React.ReactNode}> = ({
    children,
}): ReactElement => {
    return (
        <>
            <div className="pt-[15px]">{children}</div>
        </>
    );
};

export default UserProfileLayout;
