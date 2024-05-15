"use client";

import {usePathname} from "next/navigation";
import {ReactNode} from "react";

const NormalUserPage: React.FC = (): ReactNode => {
    const pathname = usePathname();
    const id: string = pathname.substring(pathname.lastIndexOf("/") + 1);

    return <div>This is normal user with ID {id}</div>;
};

export default NormalUserPage;
