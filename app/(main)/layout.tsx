"use client";

import {PublicMetadata} from "@/constaints";
import {useUser} from "@clerk/nextjs";
import {useRouter} from "next/navigation";
import {ReactElement, useEffect} from "react";
import NextTopLoader from "nextjs-toploader";

const MainLayout: React.FC<{children: React.ReactNode}> = ({
    children,
}): ReactElement => {
    const router = useRouter();
    const {isSignedIn, user, isLoaded} = useUser();

    useEffect(() => {
        if (!isLoaded) return;

        if (!isSignedIn) {
            router.push("/404");
        }

        if (!(user!.publicMetadata as PublicMetadata).role) {
            router.push("/complete-profile");
        }
    }, [isLoaded]);

    return (
        <>
            <NextTopLoader color="#2ecc71" />
            <div>{children}</div>
        </>
    );
};

export default MainLayout;
