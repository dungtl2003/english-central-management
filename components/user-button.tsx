import React from "react";
import {UserButton as NextUserButton} from "@clerk/nextjs";
import {ThemeToggle} from "@/components/mode-toggle";

const UserButton = () => {
    return (
        <div className="ml-auto flex items-center gap-x-2">
            <ThemeToggle />
            <NextUserButton
                afterSignOutUrl="/"
                appearance={{
                    elements: {avatarBox: {height: 42, width: 42}},
                }}
            />{" "}
        </div>
    );
};

export default UserButton;
