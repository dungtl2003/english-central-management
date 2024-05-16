import {UserButton} from "@clerk/nextjs";
import {ReactElement} from "react";

const MainLayout: React.FC<{children: React.ReactNode}> = ({
    children,
}): ReactElement => {
    return (
        <div className="relative z-0 h-full flex flex-col">
            <nav className="fixed w-full h-18 p-4 border-b shadow-sm flex items-center">
                <div className="ml-auto flex items-center gap-x-2">
                    <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                            elements: {avatarBox: {height: 55, width: 55}},
                        }}
                    />
                </div>
            </nav>
            {children}
        </div>
    );
};

export default MainLayout;
