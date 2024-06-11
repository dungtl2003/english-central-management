import {
    Table,
    TableHead,
    TableHeader,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import {Textarea} from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import React, {ReactElement} from "react";
import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
    flexRender,
} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";

// Đây là types
type AttendanceTableModel = {
    fullName: string;
    email: string;
};

type AttendanceTableDictionary = {
    [key: string]: string;
};

const AttendanceTableDictionary: AttendanceTableDictionary = {
    fullName: "Full name",
    email: "Email",
};

// Đây là data test
const TestOnlyData: AttendanceTableModel[] = [
    {
        fullName: "Nguyễn Minh Đức",
        email: "EN3101",
    },
];

//===========================================================================

function createColumns(
    key: string,
    title: string
): ColumnDef<AttendanceTableModel> {
    return {
        accessorKey: key,
        header: () => <Button variant="ghost">{title}</Button>,
    };
}

const AttendanceTableColumns: ColumnDef<AttendanceTableModel>[] = [];

for (const key in AttendanceTableDictionary) {
    AttendanceTableColumns.push(
        createColumns(key, AttendanceTableDictionary[key])
    );
}

AttendanceTableColumns.push(
    {
        accessorKey: "select",
        header: "Select",
        cell: () => (
            <Select defaultValue="PRESENT">
                <SelectTrigger className="w-full">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="PRESENT">Present</SelectItem>
                    <SelectItem value="ABSENT">Absent</SelectItem>
                    <SelectItem value="LATE">Late</SelectItem>
                </SelectContent>
            </Select>
        ),
    },
    {
        accessorKey: "note",
        header: "Note",
        cell: () => (
            <Textarea
                placeholder="Note here."
                className="resize-none"
                spellCheck={false}
            />
        ),
    }
);

const columns: ColumnDef<AttendanceTableModel>[] = AttendanceTableColumns;

const AttendanceTable2 = (): ReactElement => {
    const data: AttendanceTableModel[] = TestOnlyData;
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {},
    });
    return (
        <div className="relative max-h-[400px] overflow-y-auto">
            <Table>
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
                                    return (
                                        <TableCell
                                            key={cell.id}
                                            className="px-5 text-left"
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
            </Table>
        </div>
    );
};

export default AttendanceTable2;
