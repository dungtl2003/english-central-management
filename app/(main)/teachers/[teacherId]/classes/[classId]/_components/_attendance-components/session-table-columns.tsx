"Use client";

import React from "react";
import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {SessionEdit} from "./session-edit";
import {sessionTableDictionary, SessionTableModel} from "./types";
import {ArrowUpDown} from "lucide-react";

function createColumns(
    key: string,
    title: string
): ColumnDef<SessionTableModel> {
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

const sessionTableColumns: ColumnDef<SessionTableModel>[] = [];
for (const key in sessionTableDictionary) {
    sessionTableColumns.push(createColumns(key, sessionTableDictionary[key]));
}

sessionTableColumns.push({
    id: "actions",
    enableHiding: false,
    cell: ({row}) => <SessionEdit data={row.original} />,
});

export default sessionTableColumns;
