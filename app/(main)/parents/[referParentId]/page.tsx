"use client";

import {ReactElement} from "react";
import ParentDetail from "./_components/parent-detail";

const ParentsPage: React.FC = (): ReactElement => {
    return (
        <>
            <div className="flex justify-center">
                <ParentDetail />
            </div>
        </>
    );
};

export default ParentsPage;
