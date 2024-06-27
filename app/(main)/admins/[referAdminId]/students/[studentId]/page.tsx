"use client";

import React, {ReactElement} from "react";
import StudentDetail from "./_components/student-detail";

const StudentDetailPage = (): ReactElement => {
    return (
        <div className="flex justify-center">
            <StudentDetail />
        </div>
    );
};

export default StudentDetailPage;
