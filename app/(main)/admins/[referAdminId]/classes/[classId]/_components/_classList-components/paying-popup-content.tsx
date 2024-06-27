import React, {ReactElement} from "react";
import {
    PaginationState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    ColumnFiltersState,
    flexRender,
} from "@tanstack/react-table";
import {Table} from "@/components/ui/table";
import {PayingPopupDummyData} from "./paying-popup-dummy-data";
import PayingPopupPagination from "./paing-popup-pagination";
import {
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {PayingPopupModel, PayingPopupDictionary} from "./types";
import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";

function createColumns(
    key: string,
    title: string
): ColumnDef<PayingPopupModel> {
    return {
        accessorKey: key,
        header: () => <Button variant="ghost">{title}</Button>,
    };
}

interface ColumnProps {
    handleSelectAllChange: (isChecked: boolean) => void;
}

const PayingPopupColumns = ({
    handleSelectAllChange,
}: ColumnProps): ColumnDef<PayingPopupModel>[] => {
    const columns: ColumnDef<PayingPopupModel>[] = [];
    columns.push({
        id: "select",
        header: ({table}) => {
            return (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => handleSelectAllChange(!!value)}
                />
            );
        },
        cell: ({row}) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
            />
        ),
        enableSorting: false,
        enableHiding: false,
    });
    for (const key in PayingPopupDictionary) {
        columns.push(createColumns(key, PayingPopupDictionary[key]));
    }

    return columns;
};

const data: PayingPopupModel[] = PayingPopupDummyData;

const PayingPopupContent = (): ReactElement => {
    const [rowSelection, setRowSelection] = React.useState({});
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 4,
    });

    const handleSelectAllChange = (isChecked: boolean) => {
        const newSelection: boolean[] = [];
        if (isChecked) {
            data.forEach((row, index) => {
                if (row.status === "Debt") {
                    newSelection[index] = true;
                }
            });
        }
        setRowSelection(newSelection);
    };
    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([{id: "status", value: "Debt"}]);

    const table = useReactTable({
        data,
        columns: PayingPopupColumns({handleSelectAllChange}),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        onColumnFiltersChange: setColumnFilters,
        enableRowSelection: (row) => row.original.status !== "Paid",
        state: {
            rowSelection,
            pagination,
            columnFilters,
        },
    });

    return (
        <div className="min-h-[300px]">
            <div className="rounded-md border">
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
                                <TableRow
                                    key={row.id}
                                    className={
                                        row.original.status == "Paid"
                                            ? "opacity-50 pointer-events-none"
                                            : ""
                                    }
                                    data-state={
                                        row.getIsSelected() && "selected"
                                    }
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
                </Table>
            </div>
            <PayingPopupPagination table={table} />
        </div>
    );
};

export default PayingPopupContent;
