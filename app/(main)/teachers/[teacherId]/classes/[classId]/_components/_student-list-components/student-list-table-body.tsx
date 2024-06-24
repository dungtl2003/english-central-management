import React, {ReactElement} from "react";
import {TableBody as TBody, TableCell, TableRow} from "@/components/ui/table";
import {ColumnDef, Table, flexRender} from "@tanstack/react-table";
import {StudentInfoData} from "./types";

type TableBodyProps = {
    table: Table<StudentInfoData>;
    columns: ColumnDef<StudentInfoData>[];
};

const ClassListTableBody = (props: TableBodyProps): ReactElement => {
    return (
        <TBody>
            {props.table.getRowModel().rows?.length ? (
                props.table.getRowModel().rows.map((row) => (
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
