import React, {ReactElement} from "react";
import {flexRender, Table} from "@tanstack/react-table";
import {TableBody, TableCell, TableRow} from "@/components/ui/table";
import {PayingPopupModel} from "./paying-popup-model";

interface PayingPopupBodyProps {
    table: Table<PayingPopupModel>;
}

const PayingPopupBody = ({table}: PayingPopupBodyProps): ReactElement => {
    return (
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
        </TableBody>
    );
};

export default PayingPopupBody;
