import React, {ReactElement} from "react";
import {Table as T} from "@/components/ui/table";
import {ColumnDef, Table} from "@tanstack/react-table";
import {SessionTableModel} from "./types";
import {TableHeader as THead, TableHead, TableRow} from "@/components/ui/table";
import {TableBody as TBody, TableCell} from "@/components/ui/table";
import {flexRender} from "@tanstack/react-table";
import {FaCheckCircle} from "react-icons/fa";

type TableContentProps = {
    table: Table<SessionTableModel>;
    columns: ColumnDef<SessionTableModel>[];
};

const SessionTableContent = (props: TableContentProps): ReactElement => {
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
                                    const isTuitionPaidColumn =
                                        cell.column.id === "status";
                                    const cellValue: string =
                                        cell.getValue<string>();
                                    return (
                                        <TableCell
                                            key={cell.id}
                                            className="w-2/12"
                                        >
                                            {isTuitionPaidColumn ? (
                                                cellValue.toLowerCase() ===
                                                "true" ? (
                                                    <div className="flex items-center justify-center">
                                                        <FaCheckCircle
                                                            size={20}
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
            </T>
        </div>
    );
};

export default SessionTableContent;
