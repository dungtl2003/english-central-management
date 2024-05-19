import React from "react";
import {ThemeToggle} from "./modeToggle";

const preLogin = () => {
    return (
        <div className="ml-auto flex items-center gap-x-2">
            <ThemeToggle />
            <a href="/sign-in">Sign in</a> / <a href="/sign-up">Sign up</a>
        </div>
    );
};

export default preLogin;
