import {ReactElement} from "react";

const AuthLayout: React.FC<{children: React.ReactNode}> = ({
    children,
}): ReactElement => {
    return (
        <div className="flex items-center justify-center h-full">
            {children}
        </div>
    );
};

export default AuthLayout;
