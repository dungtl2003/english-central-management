"use client";

import {ParallaxAdminHomePage} from "@/components/home_page/homepage";
// import {usePathname} from "next/navigation";
import React, {ReactElement} from "react";

const AdminPage: React.FC = (): ReactElement => {
    // const pathname = usePathname();
    // const id: string = pathname.substring(pathname.lastIndexOf("/") + 1);

    return <ParallaxAdminHomePage />;
};

export default AdminPage;
