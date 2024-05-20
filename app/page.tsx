"use client";

import {ReactElement} from "react";
import PreLogin from "@/components/pre-login";
import Logo from "@/components/logo";

const HomePage: React.FC = (): ReactElement => {
    return (
        <div className="relative z-0 h-full flex flex-col">
            <nav className="w-full h-16 p-4 border-b shadow-sm flex items-center">
                <Logo />
                <PreLogin />
            </nav>
        </div>
    );
};

export default HomePage;
