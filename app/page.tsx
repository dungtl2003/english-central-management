"use client";

import {ReactElement} from "react";
import PreLogin from "@/components/preLogin";
import Logo from "@/components/logo";
import {ModeToggle} from "@/components/modeToggle";

const HomePage: React.FC = (): ReactElement => {
    return (
        <div className="relative z-0 h-full flex flex-col">
            <nav className="block w-full h-16 p-4 border-b shadow-sm flex items-center">
                <Logo />
                <PreLogin />
            </nav>
            <ModeToggle />
        </div>
    );
};

export default HomePage;
