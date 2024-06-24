import React, {ReactElement} from "react";
import SessionTableHeader from "./session-table-header";
import SesisonTableBody from "./session-table-body";
import {Table as T} from "@/components/ui/table";
import {ColumnDef, Table} from "@tanstack/react-table";
import {SessionTableModel} from "./types";

const SessionTableContent: React.FC<{
    table: Table<SessionTableModel>;
    columns: ColumnDef<SessionTableModel>[];
}> = ({table, columns}): ReactElement => {
    return (
        <div className="rounded-md border">
            <T>
                <SessionTableHeader table={table} />
                <SesisonTableBody table={table} columns={columns} />
            </T>
        </div>
    );
};

export default SessionTableContent;
