import React, {ReactElement, useEffect, useState} from "react";
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
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import SalaryDetailTableContent from "./salary-detail-table-content";
import SalaryDetailTableColumns from "./salary-detail-table-columns";
import {SalaryDetailStatus, SalaryDetailTableData} from "./types";
import {SalaryDetailData} from "../../types";
import {format, parse} from "date-fns";
import {TeacherStatus} from "@prisma/client";

const formatData = (
    salaryDetailData: SalaryDetailData[] | undefined,
    acceptDate: Date | undefined,
    monthlySalary: string
): SalaryDetailTableData[] => {
    if (!salaryDetailData || !acceptDate) return [];

    const salaryDetailTableData: SalaryDetailTableData[] = [];

    let lastMonth: number = 0;
    let lastYear: number = 0;

    //If have payments
    if (salaryDetailData.length !== 0) {
        salaryDetailData.sort((a, b) => {
            return a.year === b.year
                ? Number(a.month) - Number(b.month)
                : Number(a.year) - Number(b.year);
        });
        salaryDetailData.forEach((e) => {
            const d: SalaryDetailTableData = {
                monthlyPaymentId: e.monhthlyPaymentId,
                amount: e.salary,
                month: (Number(e.month) + 1).toString(),
                year: e.year,
                paidAt: e.paidAt,
                time: format(
                    new Date(Number(e.year), Number(e.month), 1),
                    "MM/yyyy"
                ),
                status: "PAID" as SalaryDetailStatus,
            };
            salaryDetailTableData.push(d);
        });
        lastMonth = Number(
            salaryDetailTableData[salaryDetailTableData.length - 1].month
        );
        lastYear = Number(
            salaryDetailTableData[salaryDetailTableData.length - 1].year
        );
    }

    if (lastMonth === 0) {
        if (acceptDate.getMonth() === 0) {
            lastMonth = 12;
            lastYear = acceptDate.getFullYear() - 1;
        } else {
            lastMonth = acceptDate.getMonth();
            lastYear = acceptDate.getFullYear();
        }
    }

    const today = new Date();
    const monthCurrent = today.getMonth() + 1;
    const yearCurrent = today.getFullYear();

    while (acceptDate < today) {
        if (lastMonth === 12) {
            lastMonth = 1;
            lastYear++;
        } else {
            lastMonth++;
        }

        if (lastYear >= yearCurrent && lastMonth >= monthCurrent) break;

        const d: SalaryDetailTableData = {
            monthlyPaymentId: undefined,
            amount: monthlySalary,
            month: lastMonth.toString(),
            year: lastYear.toString(),
            paidAt: undefined,
            time:
                lastMonth < 10
                    ? "0" + lastMonth + "/" + lastYear
                    : lastMonth + "/" + lastYear,
            status: "DEBT" as SalaryDetailStatus,
        };
        salaryDetailTableData.push(d);
    }
    salaryDetailTableData.reverse();

    return salaryDetailTableData;
};

const SalaryDetailTable = ({
    setIsUpdating,
    teacherId,
    teacherStatus,
    salaryDetailData,
    baseSalary,
    monthlySalary,
    acceptDate,
}: {
    setIsUpdating: (v: boolean) => void;
    teacherId: string;
    teacherStatus: TeacherStatus;
    salaryDetailData: SalaryDetailData[] | undefined;
    baseSalary: string;
    monthlySalary: string;
    acceptDate: string;
}): ReactElement => {
    const [data, setData] = useState(
        formatData(
            salaryDetailData,
            acceptDate
                ? parse(acceptDate, "dd/MM/yyyy", new Date())
                : undefined,
            monthlySalary
        )
    );

    useEffect(() => {
        setData(
            formatData(
                salaryDetailData,
                acceptDate
                    ? parse(acceptDate, "dd/MM/yyyy", new Date())
                    : undefined,
                monthlySalary
            )
        );
    }, [salaryDetailData, acceptDate, baseSalary, monthlySalary]);

    const [rowSelection, setRowSelection] = React.useState({});
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 3,
    });

    const handleSelectAllBefore = (isChecked: boolean, lastIndex: number) => {
        const newSelection: boolean[] = [];
        if (isChecked) {
            for (let i = lastIndex; i < data.length; i++) {
                if (data[i].status === "PAID") break;
                newSelection[i] = true;
            }
        }
        setRowSelection(newSelection);
    };

    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([{id: "status", value: "DEBT"}]);

    const [showPaid, setShowPaid] = React.useState(false);
    const handleCheckboxChange = (isChecked: boolean) => {
        setShowPaid(isChecked);
        table.setColumnFilters((old) => [
            ...old.filter((filter) => filter.id !== "status"),
            ...(isChecked ? [] : [{id: "status", value: "DEBT"}]),
        ]);
    };

    const table = useReactTable({
        data,
        columns: SalaryDetailTableColumns({handleSelectAllBefore}),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        onColumnFiltersChange: setColumnFilters,
        enableRowSelection: (row) => (row.original.status as string) !== "PAID",
        state: {
            rowSelection,
            pagination,
            columnFilters,
        },
    });

    // Đoạn này có cảnh báo gì đó nhớ check xem có ảnh hưởng ko
    const rowsSelected = table.getSelectedRowModel().rows;
    const selectedTotal = React.useMemo(() => {
        return table
            .getSelectedRowModel()
            .rows.reduce((sum, row) => sum + Number(row.original.amount), 0);
    }, [rowsSelected]);

    return (
        <>
            <div className="rounded-md border">
                <Table>
                    <SalaryDetailTableContent
                        teacherStatus={teacherStatus}
                        setIsUpdating={setIsUpdating}
                        table={table}
                        selectedTotal={selectedTotal}
                        teacherId={teacherId}
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
