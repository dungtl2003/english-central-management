import React, {ReactElement} from "react";
import {TableBody as TBody, TableCell, TableRow} from "@/components/ui/table";
import {Cell, ColumnDef, Table, flexRender} from "@tanstack/react-table";
import {StudentInfo} from "../_attendance-components/student-info";

type TableBodyProps = {
    table: Table<StudentInfo>;
    columns: ColumnDef<StudentInfo>[];
};

const ClassListTableBody = (props: TableBodyProps): ReactElement => {
    const renderCellContent = (cell: Cell<StudentInfo, unknown>) => {
        const cellValue: string = cell.getValue<string>();

        switch (cell.column.id) {
            case "tuitionPaid":
                return cellValue.toLowerCase() === "true"
                    ? "All paid"
                    : "In debt";
            default:
                return flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                );
        }
    };

    return (
        <TBody>
            {props.table.getRowModel().rows?.length ? (
                props.table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id}>
                        {row.getAllCells().map((cell) => {
                            const isIndexColumn = cell.column.id === "index";
                            const isFullNameColumn =
                                cell.column.id === "fullName";
                            const className = isIndexColumn
                                ? "max-w-[100px]"
                                : isFullNameColumn
                                  ? "text-left"
                                  : "";

                            return (
                                <TableCell key={cell.id} className={className}>
                                    {renderCellContent(cell)}
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
