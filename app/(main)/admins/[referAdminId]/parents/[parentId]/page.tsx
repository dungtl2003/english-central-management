"use client";

import React, {ReactElement} from "react";
import ParentDetail from "./_components/parent-detail";

const ParentDetailPage = (): ReactElement => {
    return (
        <div className="flex justify-center">
            <ParentDetail />
        </div>
    );
};

export default ParentDetailPage;
