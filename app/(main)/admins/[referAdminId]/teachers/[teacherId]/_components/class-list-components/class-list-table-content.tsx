import React, {ReactElement} from "react";
import {
    TableHeader,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
} from "@/components/ui/table";
import {Table as T} from "@/components/ui/table";
import {ColumnDef, Table, flexRender} from "@tanstack/react-table";
import {ClasslistTableData} from "./types";

interface TableContentProps {
    table: Table<ClasslistTableData>;
    columns: ColumnDef<ClasslistTableData>[];
}

const ClassListTableContent = ({
    table,
    columns,
}: TableContentProps): ReactElement => {
    return (
        <div className="rounded-md border">
            <T>
                <TableHeader>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map((header) => {
                                return (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                  header.column.columnDef
                                                      .header,
                                                  header.getContext()
                                              )}
                                    </TableHead>
                                );
                            })}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows?.length ? (
                        table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getAllCells().map((cell) => (
                                    <TableCell key={cell.id} className="w-2/12">
                                        {flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )}
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    ) : (
                        <TableRow>
                            <TableCell
                                colSpan={columns.length}
                                className="h-24 text-center"
                            >
                                No results.
                            </TableCell>
                        </TableRow>
                    )}
                </TableBody>
            </T>
        </div>
    );
};

export default ClassListTableContent;
