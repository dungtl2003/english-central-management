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
import {StudentListModel} from "./types";
import {FaCheckCircle} from "react-icons/fa";

const StudentListContent = ({
    table,
    columns,
}: {
    table: Table<StudentListModel>;
    columns: ColumnDef<StudentListModel>[];
}): ReactElement => {
    function shortenString(input: string): string {
        const shortened = `${input.slice(0, 12)}.....`;
        return shortened;
    }

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
                                    const isEmailColumn =
                                        cell.column.id === "email";
                                    const isDesiredClassColumn =
                                        cell.column.id === "hasDesireClass";

                                    let cellContent = flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    );

                                    if (isEmailColumn) {
                                        cellContent = shortenString(
                                            cell.getValue() as string
                                        );
                                    } else if (isDesiredClassColumn) {
                                        cellContent =
                                            cell.getValue<boolean>() ? (
                                                <div className="flex items-center justify-center">
                                                    <FaCheckCircle size={25} />
                                                </div>
                                            ) : (
                                                ""
                                            );
                                    }
                                    return (
                                        <TableCell
                                            key={cell.id}
                                            className={"w-2/12" + cn}
                                        >
                                            {
                                                /* {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )} */ cellContent
                                            }
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

export default StudentListContent;
