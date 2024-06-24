import {Table, flexRender} from "@tanstack/react-table";
import {AttendanceTableModel} from "./types";
import {ReactElement} from "react";
import {TableHead, TableHeader, TableRow} from "@/components/ui/table";

const AttendanceTableHeader: React.FC<{table: Table<AttendanceTableModel>}> = ({
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

export default AttendanceTableHeader;
