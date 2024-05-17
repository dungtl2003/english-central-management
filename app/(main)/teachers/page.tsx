"use client";

import {ReactElement} from "react";
import UserButton from "@/components/userButton";
import Logo from "@/components/logo";

const TeachersPage: React.FC = (): ReactElement => {
    return (
        <div className="relative z-0 h-full flex flex-col">
            <nav className="fixed w-full h-16 p-4 border-b shadow-sm flex items-center">
                <Logo />
                <UserButton />
            </nav>
        </div>
    );
};

export default TeachersPage;
