import {UserButton} from "@clerk/nextjs";
import {ReactElement} from "react";

const MainLayout: React.FC<{children: React.ReactNode}> = ({
    children,
}): ReactElement => {
    return (
        <div className="relative z-0 h-full flex flex-col">
            <nav className="fixed w-full h-14 p-4 border-b shadow-sm flex items-center">
                <div className="ml-auto flex items-center gap-x-2">
                    <UserButton
                        afterSignOutUrl="/"
                        appearance={{
                            elements: {
                                avatarBox: {
                                    height: 30,
                                    width: 30,
                                },
                            },
                        }}
                    />
                </div>
            </nav>
            This is main layout
            {children}
        </div>
    );
};

export default MainLayout;
