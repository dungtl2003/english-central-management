"use client";

import {ReactElement} from "react";
import StudentDetail from "./_components/student-detail";

const StudentsPage: React.FC = (): ReactElement => {
    return (
        <>
            <div className="flex justify-center">
                <StudentDetail />
            </div>
        </>
    );
};

export default StudentsPage;
