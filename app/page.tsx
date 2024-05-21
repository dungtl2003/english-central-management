"use client";

import {ReactElement} from "react";
import PreLogin from "@/components/pre-login";
import Logo from "@/components/logo";
import {UserButton, useUser} from "@clerk/nextjs";

const HomePage: React.FC = (): ReactElement => {
    const {isSignedIn} = useUser();
    return (
        <div className="relative z-0 h-full flex flex-col">
            <nav className="w-full h-16 p-4 border-b shadow-sm flex items-center">
                <Logo />
                {isSignedIn ? <UserButton /> : <PreLogin />}
            </nav>
        </div>
    );
};

export default HomePage;
