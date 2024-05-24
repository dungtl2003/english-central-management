import React, {ReactElement} from "react";
import TableHeader from "./table-header";
import TableBody from "./table-body";
import {Table as T} from "@/components/ui/table";
import {ColumnDef, Table} from "@tanstack/react-table";
import {ClassInfo} from "./class-info";

type TableContentProps = {
    table: Table<ClassInfo>;
    columns: ColumnDef<ClassInfo>[];
};

const TableContent = (props: TableContentProps): ReactElement => {
    return (
        <div className="rounded-md border">
            <T>
                <TableHeader table={props.table} />
                <TableBody table={props.table} columns={props.columns} />
            </T>
        </div>
    );
};

export default TableContent;
