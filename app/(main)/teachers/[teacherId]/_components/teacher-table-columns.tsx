"Use client";

import React from "react";
import {ClassInfo, ClassInfoDictionary} from "./class-info";
import {ArrowUpDown} from "lucide-react";
import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import TablePreviewSheet from "./table-preview-sheet";

function createColumns(key: string, title: string): ColumnDef<ClassInfo> {
    return {
        accessorKey: key,
        header: ({column}) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() !== "desc")
                }
            >
                {title}
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    };
}

const TeacherTableColumns: ColumnDef<ClassInfo>[] = [];
for (const key in ClassInfoDictionary) {
    TeacherTableColumns.push(createColumns(key, ClassInfoDictionary[key]));
}

TeacherTableColumns.push({
    id: "actions",
    enableHiding: false,
    cell: ({row}) => <TablePreviewSheet data={row.original} />,
});

export default TeacherTableColumns;
