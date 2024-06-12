import {TableBody, TableCell, TableRow} from "@/components/ui/table";
import {ColumnDef, Table, flexRender} from "@tanstack/react-table";
import React, {ReactElement} from "react";
import {AttendanceTableModel} from "./types";

const AttendanceTableBody: React.FC<{
    table: Table<AttendanceTableModel>;
    columns: ColumnDef<AttendanceTableModel>[];
}> = ({table, columns}): ReactElement => {
    return (
        <TableBody>
            {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                        {row.getAllCells().map((cell) => {
                            return (
                                <TableCell
                                    key={cell.id}
                                    className="px-5 text-left"
                                >
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </TableCell>
                            );
                        })}
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
    );
};

export default AttendanceTableBody;
