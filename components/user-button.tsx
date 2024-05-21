import React from "react";
import {UserButton as NextUserButton} from "@clerk/nextjs";

const UserButton = () => {
    return (
        <NextUserButton
            afterSignOutUrl="/"
            appearance={{
                elements: {avatarBox: {height: 42, width: 42}},
            }}
        />
    );
};

export default UserButton;
