import React, {ReactElement} from "react";
import {TableHeader as THead, TableHead, TableRow} from "@/components/ui/table";
import {Table, flexRender} from "@tanstack/react-table";
import {SessionTableModel} from "./types";

interface TableHeaderProps {
    table: Table<SessionTableModel>;
}

const SessionTableHeader = (props: TableHeaderProps): ReactElement => {
    return (
        <THead>
            {props.table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                        return (
                            <TableHead key={header.id}>
                                {header.isPlaceholder
                                    ? null
                                    : flexRender(
                                          header.column.columnDef.header,
                                          header.getContext()
                                      )}
                            </TableHead>
                        );
                    })}
                </TableRow>
            ))}
        </THead>
    );
};

export default SessionTableHeader;
