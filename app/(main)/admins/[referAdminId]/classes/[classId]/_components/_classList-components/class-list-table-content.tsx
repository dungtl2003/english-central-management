import React, {ReactElement} from "react";
import {Table as T} from "@/components/ui/table";
import {Cell, ColumnDef, Table, flexRender} from "@tanstack/react-table";
import {StudentInfo} from "./types";
import {TableHeader as THead, TableHead, TableRow} from "@/components/ui/table";
import {TableBody as TBody, TableCell} from "@/components/ui/table";

type TableContentProps = {
    table: Table<StudentInfo>;
    columns: ColumnDef<StudentInfo>[];
};

const ClassListTableContent = (props: TableContentProps): ReactElement => {
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
        <div className="rounded-md border">
            <T>
                <THead>
                    {props.table.getHeaderGroups().map((headerGroup) => (
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
                </THead>
                <TBody>
                    {props.table.getRowModel().rows?.length ? (
                        props.table.getRowModel().rows.map((row) => (
                            <TableRow key={row.id}>
                                {row.getAllCells().map((cell) => {
                                    const isIndexColumn =
                                        cell.column.id === "index";
                                    const isFullNameColumn =
                                        cell.column.id === "fullName";
                                    const className = isIndexColumn
                                        ? "max-w-[100px]"
                                        : isFullNameColumn
                                          ? "text-left"
                                          : "";

                                    return (
                                        <TableCell
                                            key={cell.id}
                                            className={className}
                                        >
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
            </T>
        </div>
    );
};

export default ClassListTableContent;
