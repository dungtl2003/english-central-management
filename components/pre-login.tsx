import React from "react";
import {ThemeToggle} from "./mode-toggle";

const PreLogin = () => {
    return (
        <div className="ml-auto items-center flex gap-x-2">
            <ThemeToggle />
            <a href="/sign-in">Sign in</a> / <a href="/sign-up">Sign up</a>
        </div>
    );
};

export default PreLogin;
