import React, {ReactElement} from "react";
import {
    PaginationState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    ColumnFiltersState,
} from "@tanstack/react-table";
import {Table} from "@/components/ui/table";
import {SalaryDetailTestData} from "./test-data";
import {SalaryDetailColumns} from "./types";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import SalaryDetailTableContent from "./salary-detail-table-content";
import SalaryDetailTableColumns from "./salary-detail-table-columns";

const data: SalaryDetailColumns[] = SalaryDetailTestData;

const SalaryDetailTable = (): ReactElement => {
    const [rowSelection, setRowSelection] = React.useState({});
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 3,
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

    const [showPaid, setShowPaid] = React.useState(false);
    const handleCheckboxChange = (isChecked: boolean) => {
        setShowPaid(isChecked);
        table.setColumnFilters((old) => [
            ...old.filter((filter) => filter.id !== "status"),
            ...(isChecked ? [] : [{id: "status", value: "Debt"}]),
        ]);
    };

    const table = useReactTable({
        data,
        columns: SalaryDetailTableColumns({handleSelectAllChange}),
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

    // Đoạn này có cảnh báo gì đó nhớ check xem có ảnh hưởng ko
    const selectedTotal = React.useMemo(() => {
        return table
            .getSelectedRowModel()
            .rows.reduce((sum, row) => sum + parseInt(row.original.amount), 0);
    }, [table.getSelectedRowModel().rows]);

    return (
        <>
            <div className="rounded-md border">
                <Table>
                    <SalaryDetailTableContent
                        table={table}
                        selectedTotal={selectedTotal}
                    />
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="flex-1 items-center space-x-2">
                    <Checkbox
                        checked={showPaid}
                        onCheckedChange={handleCheckboxChange}
                        id="togglePaid"
                    />
                    <label
                        htmlFor="togglePaid"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                        Show paid
                    </label>
                </div>
                <div className="space-x-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.previousPage()}
                        disabled={!table.getCanPreviousPage()}
                    >
                        Previous
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => table.nextPage()}
                        disabled={!table.getCanNextPage()}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </>
    );
};

export default SalaryDetailTable;
