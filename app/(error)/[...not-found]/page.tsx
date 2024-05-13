import {notFound} from "next/navigation";
import React, {ReactElement} from "react";

const NotFoundPage: React.FC = (): ReactElement => {
    return notFound();
};

export default NotFoundPage;
