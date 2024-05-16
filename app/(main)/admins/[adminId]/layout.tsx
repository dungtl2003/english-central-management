import {UserJwtSessionClaims} from "@/constaints";
import {auth} from "@clerk/nextjs/server";
import {UserRole} from "@prisma/client";
import {redirect} from "next/navigation";
import {ReactElement} from "react";

const AdminLayout: React.FC<{children: React.ReactNode}> = ({
    children,
}): ReactElement => {
    const jwt: UserJwtSessionClaims | null = auth().sessionClaims;
    const role: string | null =
        jwt && jwt!.metadata ? jwt!.metadata!.role : null;
    if (!role || role !== UserRole.admin) {
        redirect("/404");
    }

    return <>{children}</>;
};

export default AdminLayout;
