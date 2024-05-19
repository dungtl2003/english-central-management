import React from "react";
import {UserButton} from "@clerk/nextjs";
import {ThemeToggle} from "@/components/modeToggle";

const userButton = () => {
    return (
        <div className="ml-auto flex items-center gap-x-2">
            <ThemeToggle />
            <UserButton
                afterSignOutUrl="/"
                appearance={{
                    elements: {avatarBox: {height: 42, width: 42}},
                }}
            />{" "}
        </div>
    );
};

export default userButton;
