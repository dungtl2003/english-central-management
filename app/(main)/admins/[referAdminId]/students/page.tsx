"use client";

import React, {ReactElement} from "react";
import StudentListTable from "./_components/student-list-table";

const StudentsPage = (): ReactElement => {
    return (
        <div className="flex justify-center">
            <StudentListTable />
        </div>
    );
};

export default StudentsPage;
