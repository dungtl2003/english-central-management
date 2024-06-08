import React, {ReactElement, useCallback} from "react";
import {
    PaginationState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    ColumnFiltersState,
    ColumnDef,
    flexRender,
} from "@tanstack/react-table";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import PayingPopupColumns from "./paying-popup-columns";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";
import {
    PayingPopupData,
    PayingPopupDictionary,
    PayingPopupStatus,
    StudentInfoData,
} from "./types";
import {Checkbox} from "@/components/ui/checkbox";

function createColumns(key: string, title: string): ColumnDef<PayingPopupData> {
    return {
        accessorKey: key,
        header: () => <Button variant="ghost">{title}</Button>,
    };
}

const columns: ColumnDef<PayingPopupData>[] = [];

const PayingPopupContent: React.FC<{data: StudentInfoData}> = ({
    data,
}): ReactElement => {
    const [rowSelection, setRowSelection] = React.useState({});
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 4,
    });
    const [showPaid, setShowPaid] = React.useState(false);
    const [totalAmountNoDiscount, setTotalAmountNoDiscount] = React.useState(0);
    const [totalAmountWithDiscount, setTotalAmountWithDiscount] =
        React.useState(0);

    const handleCheckboxChange = (isChecked: boolean) => {
        setShowPaid(isChecked);
        table.setColumnFilters((old) => [
            ...old.filter((filter) => filter.id !== "status"),
            ...(isChecked
                ? []
                : [{id: "status", value: PayingPopupStatus.DEBT}]),
        ]);
    };
    const handleSelectAllChange = (isChecked: boolean) => {
        const newSelection: boolean[] = [];
        if (isChecked) {
            data.payments.forEach((row, index) => {
                if (row.status === PayingPopupStatus.DEBT) {
                    newSelection[index] = true;
                }
            });
        }
        setRowSelection(newSelection);
    };
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

    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([
            {id: "status", value: PayingPopupStatus.DEBT},
        ]);
    const table = useReactTable({
        data: data.payments,
        columns: PayingPopupColumns({handleSelectAllChange}),
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onRowSelectionChange: setRowSelection,
        onPaginationChange: setPagination,
        onColumnFiltersChange: setColumnFilters,
        enableRowSelection: (row) =>
            row.original.status !== PayingPopupStatus.PAID,
        state: {
            rowSelection,
            pagination,
            columnFilters,
        },
    });

    const calculateTotals = useCallback(() => {
        const selectedRows = table
            .getSelectedRowModel()
            .rows.map((row) => row.original);
        const totalNoDiscount = selectedRows.reduce(
            (sum, row) => sum + parseFloat(row.monthlyFee),
            0
        );
        const totalWithDiscount: number =
            totalNoDiscount * ((100 - Number(data.discount)) / 100);

        setTotalAmountNoDiscount(totalNoDiscount);
        setTotalAmountWithDiscount(totalWithDiscount);
    }, [table, data.discount]);

    React.useEffect(() => {
        calculateTotals();
    }, [rowSelection, calculateTotals]);

    return (
        <>
            <div className="grid grid-cols-2 gap-x-4">
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
                                                              header.column
                                                                  .columnDef
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
                                                row.original.status ==
                                                PayingPopupStatus.PAID
                                                    ? "opacity-50 pointer-events-none"
                                                    : ""
                                            }
                                            data-state={
                                                row.getIsSelected() &&
                                                "selected"
                                            }
                                        >
                                            {row
                                                .getVisibleCells()
                                                .map((cell) => (
                                                    <TableCell key={cell.id}>
                                                        {flexRender(
                                                            cell.column
                                                                .columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </TableCell>
                                                ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell
                                            colSpan={
                                                table.getAllColumns().length
                                            }
                                            className="h-24 text-center"
                                        >
                                            No results.
                                        </TableCell>
                                    </TableRow>
                                )}
                            </TableBody>
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
                </div>
                <div className="min-h-[300px]">
                    <div className="mb-3.5">
                        <Label className="pl-1 text-left">Parent</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue placeholder="Choose your parent" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {data.parents?.map((parent) => (
                                        <SelectItem
                                            key={parent.id}
                                            value={parent.id}
                                        >
                                            {parent.fullName}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="mb-3.5">
                        <Label
                            htmlFor="totalNoDiscount"
                            className="pl-1 text-left"
                        >
                            Total amount{" "}
                            <span className="text-slate-400">
                                (No discount)
                            </span>
                        </Label>
                        <Input
                            id="totalNoDiscount"
                            type="text"
                            className="mt-1"
                            value={`$${totalAmountNoDiscount}`}
                            readOnly
                        />
                    </div>
                    <div className="mb-3.5 grid grid-cols-2 gap-x-3">
                        <div>
                            <Label
                                htmlFor="discount"
                                className="pl-1 text-left"
                            >
                                Discount{" "}
                                <span className="text-slate-400">(%)</span>
                            </Label>
                            <Input
                                id="discount"
                                type="text"
                                className="mt-1"
                                value={`${data.discount}%`}
                                readOnly
                            />
                        </div>
                        <div>
                            <Label
                                htmlFor="totalWithDiscount"
                                className="pl-1 text-left"
                            >
                                Total amount{" "}
                                <span className="text-slate-400">
                                    (Discount)
                                </span>
                            </Label>
                            <Input
                                id="totalWithDiscount"
                                type="text"
                                className="mt-1"
                                value={`$${totalAmountWithDiscount}`}
                                readOnly
                            />
                        </div>
                    </div>
                    <div className="flex justify-center">
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
                    </div>
                </div>
            </div>
        </>
    );
};

export default PayingPopupContent;
