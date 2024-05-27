"use client";

import {ReactElement} from "react";
import {TeacherTable} from "./_components/teacher-table";

const TeachersPage: React.FC = (): ReactElement => {
    return (
        <>
            <div className="flex justify-center">
                <TeacherTable />
            </div>
        </>
    );
};

export default TeachersPage;
