import React, {ReactElement} from "react";
import SessionTableHeader from "./session-table-header";
import SesisonTableBody from "./session-table-body";
import {Table as T} from "@/components/ui/table";
import {ColumnDef, Table} from "@tanstack/react-table";
import {SessionTableModel} from "./session-table-model";

type TableContentProps = {
    table: Table<SessionTableModel>;
    columns: ColumnDef<SessionTableModel>[];
};

const SessionTableContent = (props: TableContentProps): ReactElement => {
    return (
        <div className="rounded-md border">
            <T>
                <SessionTableHeader table={props.table} />
                <SesisonTableBody table={props.table} columns={props.columns} />
            </T>
        </div>
    );
};

export default SessionTableContent;
