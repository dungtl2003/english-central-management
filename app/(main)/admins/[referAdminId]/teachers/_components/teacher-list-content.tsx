import React, {ReactElement} from "react";
import {
    TableHeader,
    TableBody,
    TableCell,
    TableRow,
    TableHead,
} from "@/components/ui/table";
import {ColumnDef, Table, flexRender} from "@tanstack/react-table";
import {Table as T} from "@/components/ui/table";
import {TeacherListData} from "./types";

type TableContentProps = {
    table: Table<TeacherListData>;
    columns: ColumnDef<TeacherListData>[];
};

const TeacherListContent = ({
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
                                {row.getAllCells().map((cell) => {
                                    const isFullNameColumn =
                                        cell.column.id === "fullName";
                                    const cn: string = isFullNameColumn
                                        ? " text-left pl-7"
                                        : "";
                                    return (
                                        <TableCell
                                            key={cell.id}
                                            className={"w-2/12" + cn}
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
            </T>
        </div>
    );
};

export default TeacherListContent;
