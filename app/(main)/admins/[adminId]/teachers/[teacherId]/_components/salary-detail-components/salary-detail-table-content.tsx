import React, {ReactElement} from "react";
import {flexRender, Table} from "@tanstack/react-table";
import {SalaryDetailColumns} from "./types";
import {
    TableHead,
    TableHeader,
    TableRow,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import {Button} from "@/components/ui/button";

interface SalaryDetailTableContentProps {
    table: Table<SalaryDetailColumns>;
    selectedTotal: number;
}

const SalaryDetailTableContent = ({
    table,
    selectedTotal,
}: SalaryDetailTableContentProps): ReactElement => {
    return (
        <>
            <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                    <TableRow key={headerGroup.id}>
                        {headerGroup.headers.map((header) => {
                            return (
                                <TableHead key={header.id}>
                                    {header.isPlaceholder
                                        ? null
                                        : flexRender(
                                              header.column.columnDef.header,
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
                        <TableRow
                            key={row.id}
                            className={
                                row.original.status == "Paid"
                                    ? "opacity-50 pointer-events-none"
                                    : ""
                            }
                            data-state={row.getIsSelected() && "selected"}
                        >
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
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
                            colSpan={table.getAllColumns().length}
                            className="h-24 text-center"
                        >
                            No results.
                        </TableCell>
                    </TableRow>
                )}
                <TableRow>
                    <TableCell colSpan={table.getAllColumns().length - 2}>
                        Total
                    </TableCell>
                    <TableCell className="text-green-500">
                        ${selectedTotal.toFixed(2)}
                    </TableCell>
                    <TableCell>
                        <Button>
                            <span className="pr-1">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="size-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6v12m-3-2.818.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                    />
                                </svg>
                            </span>
                            Pay
                        </Button>
                    </TableCell>
                </TableRow>
            </TableBody>
        </>
    );
};

export default SalaryDetailTableContent;
