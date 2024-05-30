"Use client";

import React from "react";
import {SessionTableModel, SessionTableDictionary} from "./session-table-model";
import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {SessionEdit} from "./session-edit";

function createColumns(
    key: string,
    title: string
): ColumnDef<SessionTableModel> {
    return {
        accessorKey: key,
        header: () => <Button variant="ghost">{title}</Button>,
    };
}

const SessionTableColumns: ColumnDef<SessionTableModel>[] = [];
for (const key in SessionTableDictionary) {
    SessionTableColumns.push(createColumns(key, SessionTableDictionary[key]));
}

SessionTableColumns.push({
    id: "actions",
    enableHiding: false,
    cell: ({row}) => <SessionEdit data={row.original} />,
});

export default SessionTableColumns;
