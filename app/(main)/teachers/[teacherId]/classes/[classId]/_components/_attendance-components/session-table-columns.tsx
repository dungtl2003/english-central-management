"Use client";

import React from "react";
import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {SessionEdit} from "./session-edit";
import {sessionTableDictionary, SessionTableModel} from "./types";

function createColumns(
    key: string,
    title: string
): ColumnDef<SessionTableModel> {
    return {
        accessorKey: key,
        header: () => <Button variant="ghost">{title}</Button>,
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
