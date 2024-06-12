import React, {ReactElement} from "react";
import {flexRender, Table} from "@tanstack/react-table";
import {TableBody, TableCell, TableRow} from "@/components/ui/table";
import {PayingPopupData, PayingPopupStatus} from "./types";

const PayingPopupBody: React.FC<{table: Table<PayingPopupData>}> = ({
    table,
}): ReactElement => {
    return (
        <TableBody>
            {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                    <TableRow
                        key={row.id}
                        className={
                            row.original.status == PayingPopupStatus.PAID
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
        </TableBody>
    );
};

export default PayingPopupBody;
