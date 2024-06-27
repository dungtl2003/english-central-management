"use client";

import React, {ReactElement} from "react";
import ParentListTable from "./_components/parent-list-table";

const ParentsPage = (): ReactElement => {
    return (
        <div className="flex justify-center">
            <ParentListTable />
        </div>
    );
};

export default ParentsPage;
