"use client";

// import {usePathname} from "next/navigation";
import React, {ReactElement} from "react";

const AdminPage: React.FC = (): ReactElement => {
    // const pathname = usePathname();
    // const id: string = pathname.substring(pathname.lastIndexOf("/") + 1);

    return (
        <div className="flex justify-center pt-[120px]">
            This is admin dashboard
        </div>
    );
};

export default AdminPage;
