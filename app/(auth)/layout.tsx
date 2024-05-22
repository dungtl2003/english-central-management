import {ReactElement} from "react";

const AuthLayout: React.FC<{children: React.ReactNode}> = ({
    children,
}): ReactElement => {
    return (
        <>
            <div className="flex justify-center pt-[70px]">{children}</div>
        </>
    );
};
export default AuthLayout;
