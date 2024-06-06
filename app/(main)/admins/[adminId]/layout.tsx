"use client";
import {UserJwtSessionClaims, UserRole} from "@/constaints";
import {auth} from "@clerk/nextjs/server";
import {redirect} from "next/navigation";
import {ReactElement} from "react";
import AdminNavigation from "./_components/adminNavigation";

const AdminLayout: React.FC<{children: React.ReactNode}> = ({
    children,
}): ReactElement => {
    const jwt: UserJwtSessionClaims | null = auth().sessionClaims;
    const role: string | null = jwt?.metadata?.public?.role ?? null;

    if (!role || role !== UserRole.ADMIN) {
        redirect("/404");
    }

    return (
        <>
            <AdminNavigation />
            {children}
        </>
    );
};

export default AdminLayout;
