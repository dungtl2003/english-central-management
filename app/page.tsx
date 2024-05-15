import {ReactElement} from "react";

const HomeLayout: React.FC = (): ReactElement => {
    return (
        <div className="relative z-0 h-full flex flex-col">
            <nav className="fixed w-full h-18 p-4 border-b shadow-sm flex items-center">
                <div className="ml-auto flex items-center gap-x-2">
                    <a href="/sign-in">Sign in</a> /{" "}
                    <a href="/sign-up">Sign up</a>
                </div>
            </nav>
        </div>
    );
};

export default HomeLayout;
