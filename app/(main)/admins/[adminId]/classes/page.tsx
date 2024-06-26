"use client";

import React, {ReactElement} from "react";
import ClassListTable from "./_components/class-list-table";

const ClassesPage = (): ReactElement => {
    return (
        <div className="flex justify-center">
            <ClassListTable />
        </div>
    );
};

export default ClassesPage;
