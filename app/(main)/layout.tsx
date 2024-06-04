"use client";

import {PublicMetadata} from "@/constaints";
import {useUser} from "@clerk/nextjs";
import {useRouter} from "next/navigation";
import {ReactElement, useEffect, useMemo} from "react";

const MainLayout: React.FC<{children: React.ReactNode}> = ({
    children,
}): ReactElement => {
    const router = useRouter();
    const {isSignedIn, user, isLoaded} = useUser();
    const metadata = useMemo(
        () => user?.publicMetadata as PublicMetadata,
        [user]
    );

    useEffect(() => {
        if (!isLoaded) return;

        if (!isSignedIn) {
            router.push("/404");
        }

        if (!metadata || !metadata.role) {
            router.push("/complete-profile");
        }
    }, [isLoaded, isSignedIn, metadata, router]);

    return (
        <>
            <div>{children}</div>
        </>
    );
};

export default MainLayout;
