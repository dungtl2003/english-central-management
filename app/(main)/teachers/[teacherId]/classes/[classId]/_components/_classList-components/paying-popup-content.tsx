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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {Table} from "@/components/ui/table";
import {PayingPopupDummyData} from "./paying-popup-dummy-data";
import {PayingPopupModel} from "./paying-popup-model";
import PayingPopupColumns from "./paying-popup-columns";
import PayingPopupHeader from "./paying-popup-header";
import PayingPopupBody from "./paying-popup-body";
import PayingPopupPagination from "./paing-popup-pagination";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Button} from "@/components/ui/button";

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
        <>
            <div className="grid grid-cols-2 gap-x-4">
                <div className="min-h-[300px]">
                    <div className="rounded-md border">
                        <Table>
                            <PayingPopupHeader table={table} />
                            <PayingPopupBody table={table} />
                        </Table>
                    </div>
                    <PayingPopupPagination table={table} />
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
                                    <SelectItem value="idParent1">
                                        Parent 1
                                    </SelectItem>
                                    <SelectItem value="idParent2">
                                        Parent 2
                                    </SelectItem>
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="mb-3.5">
                        <Label htmlFor="fullName" className="pl-1 text-left">
                            Total amount{" "}
                            <span className="text-slate-400">
                                (No discount)
                            </span>
                        </Label>
                        <Input
                            id="fullName"
                            type="text"
                            className="mt-1"
                            value="160$"
                            readOnly
                        />
                    </div>
                    <div className="mb-3.5 grid grid-cols-2 gap-x-3">
                        <div>
                            <Label
                                htmlFor="fullName"
                                className="pl-1 text-left"
                            >
                                Discount{" "}
                                <span className="text-slate-400">(%)</span>
                            </Label>
                            <Input
                                id="fullName"
                                type="text"
                                className="mt-1"
                                value="10%"
                                readOnly
                            />
                        </div>
                        <div>
                            <Label
                                htmlFor="fullName"
                                className="pl-1 text-left"
                            >
                                Total amount{" "}
                                <span className="text-slate-400">
                                    (Discount)
                                </span>
                            </Label>
                            <Input
                                id="fullName"
                                type="text"
                                className="mt-1"
                                value="144$"
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
