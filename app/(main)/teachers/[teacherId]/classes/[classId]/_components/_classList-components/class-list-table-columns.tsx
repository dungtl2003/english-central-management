"Use client";

import React from "react";
import {
    StudentInfo,
    StudentInfoDictionary,
} from "../../../../_components/class-info";
import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import ClassListPreview from "./class-list-preview";

function createColumns(key: string, title: string): ColumnDef<StudentInfo> {
    return {
        accessorKey: key,
        header: () => <Button variant="ghost">{title}</Button>,
    };
}

const ClassListTableColumns: ColumnDef<StudentInfo>[] = [];
for (const key in StudentInfoDictionary) {
    ClassListTableColumns.push(createColumns(key, StudentInfoDictionary[key]));
}

ClassListTableColumns.push({
    id: "actions",
    enableHiding: false,
    cell: ({row}) => <ClassListPreview data={row.original} />,
});

export default ClassListTableColumns;
