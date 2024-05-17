import {UserButton} from "@clerk/nextjs";
import React from "react";

const userButton = () => {
    return (
        <div className="ml-auto flex items-center gap-x-2">
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
