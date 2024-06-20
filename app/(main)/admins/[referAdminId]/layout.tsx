"use client";
import {ReactElement} from "react";
import AdminNavigation from "./_components/admin-navigation";

const AdminLayout: React.FC<{
    children: React.ReactNode;
}> = ({children}): ReactElement => {
    return (
        <>
            <AdminNavigation />
            {children}
        </>
    );
};

export default AdminLayout;
