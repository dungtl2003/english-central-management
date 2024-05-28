import React, {ReactElement} from "react";
import {TableBody as TBody, TableCell, TableRow} from "@/components/ui/table";
import {ColumnDef, Table, flexRender} from "@tanstack/react-table";
import {StudentInfo} from "../../../../_components/class-info";

type TableBodyProps = {
    table: Table<StudentInfo>;
    columns: ColumnDef<StudentInfo>[];
};

const ClassListTableBody = (props: TableBodyProps): ReactElement => {
    return (
        <TBody>
            {props.table.getRowModel().rows?.length ? (
                props.table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                        {row.getAllCells().map((cell) => {
                            const isTuitionPaidColumn =
                                cell.column.id === "tuitionPaid";
                            const cellValue: string = cell.getValue<string>();
                            return (
                                <TableCell key={cell.id} className="w-2/12">
                                    {isTuitionPaidColumn
                                        ? cellValue.toLowerCase() === "true"
                                            ? "All paid"
                                            : "In debt"
                                        : flexRender(
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

export default ClassListTableBody;
