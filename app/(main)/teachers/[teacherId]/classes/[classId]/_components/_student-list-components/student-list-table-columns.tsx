"Use client";

import React from "react";
import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import ClassListPreview from "./student-list-preview";
import {StudentInfoData, studentInfoDictionary} from "./types";

function createColumns(key: string, title: string): ColumnDef<StudentInfoData> {
    return {
        accessorKey: key,
        header: () => <Button variant="ghost">{title}</Button>,
    };
}

const ClassListTableColumns: ColumnDef<StudentInfoData>[] = [];
for (const key in studentInfoDictionary) {
    ClassListTableColumns.push(createColumns(key, studentInfoDictionary[key]));
}

ClassListTableColumns.push({
    id: "actions",
    enableHiding: false,
    cell: ({row}) => <ClassListPreview data={row.original} />,
});

export default ClassListTableColumns;
