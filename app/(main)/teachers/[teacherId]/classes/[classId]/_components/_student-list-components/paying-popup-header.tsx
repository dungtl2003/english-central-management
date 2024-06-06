import React, {ReactElement} from "react";
import {flexRender, Table} from "@tanstack/react-table";
import {TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {PayingPopupData} from "./types";

const PayingPopupHeader: React.FC<{table: Table<PayingPopupData>}> = ({
    table,
}): ReactElement => {
    return (
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
    );
};

export default PayingPopupHeader;
