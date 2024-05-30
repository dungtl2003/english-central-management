import React, {ReactElement} from "react";
import {TableBody as TBody, TableCell, TableRow} from "@/components/ui/table";
import {ColumnDef, Table, flexRender} from "@tanstack/react-table";
import {SessionTableModel} from "./session-table-model";
import {FaCheckCircle} from "react-icons/fa";
type TableBodyProps = {
    table: Table<SessionTableModel>;
    columns: ColumnDef<SessionTableModel>[];
};

const SessionTableBody = (props: TableBodyProps): ReactElement => {
    return (
        <TBody>
            {props.table.getRowModel().rows?.length ? (
                props.table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                        {row.getAllCells().map((cell) => {
                            const isTuitionPaidColumn =
                                cell.column.id === "status";
                            const cellValue: string = cell.getValue<string>();
                            return (
                                <TableCell key={cell.id} className="w-2/12">
                                    {isTuitionPaidColumn ? (
                                        cellValue.toLowerCase() === "true" ? (
                                            <div className="flex items-center justify-center">
                                                <FaCheckCircle
                                                    className=""
                                                    size={25}
                                                />
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
                        colSpan={props.columns.length}
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
