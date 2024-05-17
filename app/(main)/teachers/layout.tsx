import {ReactElement} from "react";

const TeachersLayout: React.FC<{children: React.ReactNode}> = ({
    children,
}): ReactElement => {
    return <div>{children}</div>;
};

export default TeachersLayout;
