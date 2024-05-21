"use client";

import {ReactElement} from "react";

import {DataTableDemo} from "./_components/table-data";
import {SheetDemo} from "./_components/preview-sheet";

const TeachersPage: React.FC = (): ReactElement => {
    return (
        <>
            <div className="flex justify-center">
                <DataTableDemo />
            </div>
            <SheetDemo />
        </>
    );
};

export default TeachersPage;
