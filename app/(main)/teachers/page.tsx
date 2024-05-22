"use client";

import {ReactElement} from "react";

import {SheetDemo} from "./_components/preview-sheet";
import {TeacherTable} from "./_components/table-combine";

const TeachersPage: React.FC = (): ReactElement => {
    return (
        <>
            <div className="flex justify-center">
                <TeacherTable />
            </div>
            <SheetDemo />
        </>
    );
};

export default TeachersPage;
