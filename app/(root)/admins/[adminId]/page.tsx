"use client";

import {usePathname} from "next/navigation";
import React, {ReactElement} from "react";

const AdminPage: React.FC = (): ReactElement => {
    const pathname = usePathname();
    const id: string = pathname.substring(pathname.lastIndexOf("/") + 1);

    return <div>This is admin with ID {id}</div>;
};

export default AdminPage;
