import React, {ReactElement} from "react";
import {TableHeader as THead, TableHead, TableRow} from "@/components/ui/table";
import {Table, flexRender} from "@tanstack/react-table";
import {StudentInfoData} from "./types";

interface TableHeaderProps {
    table: Table<StudentInfoData>;
}

const ClassListTableHeader = (props: TableHeaderProps): ReactElement => {
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

export default ClassListTableHeader;
