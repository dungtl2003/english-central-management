"use client";

import {ReactElement} from "react";
import {TableDemo} from "./table-demo";

const StudentPage: React.FC = (): ReactElement => {
    return (
        <>
            <div className="flex justify-center">
                <TableDemo />
            </div>
        </>
    );
};

export default StudentPage;
