import React, {ReactElement} from "react";
import {TableBody as TBody, TableCell, TableRow} from "@/components/ui/table";
import {ColumnDef, Table, flexRender} from "@tanstack/react-table";
import {FaCheckCircle} from "react-icons/fa";
import {SessionTableModel} from "./types";

const SessionTableBody: React.FC<{
    table: Table<SessionTableModel>;
    columns: ColumnDef<SessionTableModel>[];
}> = ({table, columns}): ReactElement => {
    return (
        <TBody>
            {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                        {row.getAllCells().map((cell) => {
                            const isTuitionPaidColumn =
                                cell.column.id === "status";
                            const cellValue: boolean = cell.getValue<boolean>();
                            return (
                                <TableCell key={cell.id} className="w-2/12">
                                    {isTuitionPaidColumn ? (
                                        cellValue ? (
                                            <div className="flex items-center justify-center">
                                                <FaCheckCircle size={25} />
                                            </div>
                                        ) : (
                                            ""
                                        )
                                    ) : (
                                        flexRender(
                                            cell.column.columnDef.cell,
                                            cell.getContext()
                                        )
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
        </TBody>
    );
};

export default SessionTableBody;
