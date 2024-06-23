"use client";

import {PublicMetadata} from "@/constaints";
import {useUser} from "@clerk/nextjs";
import {useRouter} from "next/navigation";
import {ReactElement, useEffect, useMemo} from "react";

const MainLayout: React.FC<{children: React.ReactNode}> = ({
    children,
}): ReactElement => {
    const {isSignedIn, user, isLoaded} = useUser();
    const router = useRouter();
    const role = useMemo(
        () => (user?.publicMetadata as PublicMetadata)?.role,
        [user]
    );

    useEffect(() => {
        if (!isLoaded) return;

        if (!isSignedIn) {
            router.push("/sign-in");
            return;
        }

        if (!role) {
            router.push("/complete-profile");
        }
    }, [isLoaded, isSignedIn, router, role]);

    return (
        <>
            <div>{children}</div>
        </>
    );
};

export default MainLayout;
