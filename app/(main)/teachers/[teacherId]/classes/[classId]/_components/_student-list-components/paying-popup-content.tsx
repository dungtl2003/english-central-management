import React, {
    ReactElement,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
import {
    PaginationState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    ColumnFiltersState,
    ColumnDef,
} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {
    PayingPopupData,
    payingPopupDictionary,
    PayingPopupStatus,
    StudentInfoData,
} from "./types";
import {Checkbox} from "@/components/ui/checkbox";
import PayingPopupTable from "./paying-popup-table";
import PayingPopupParentSelector from "./paying-popup-parent-selector";
import PayingPopupTotalAmountNoDiscount from "./paying-popup-total-amount-no-discount";
import PayingPopupDiscount from "./paying-popup-discount";
import PayingPopupTotalAmountDiscount from "./paying-popup-total-amount-discount";
import PayingPopupButtonPay from "./paying-popup-button-pay";
import {UseActionOptions, useAction} from "@/hooks/use-action";
import {handler} from "@/lib/action/teacher/update-student-payments";
import {
    InputType,
    OutputType,
    Payment,
} from "@/lib/action/teacher/update-student-payments/types";
import {useParams} from "next/navigation";
import {findMonthByName} from "@/lib/utils";
import {useToast} from "@/components/ui/use-toast";

function createNormalColumns(
    key: string,
    title: string
): ColumnDef<PayingPopupData> {
    return {
        accessorKey: key,
        header: () => <Button variant="ghost">{title}</Button>,
    };
}

function createSelectColumns(
    key: string,
    handleSelectAllChange: (isChecked: boolean) => void
): ColumnDef<PayingPopupData> {
    return {
        id: key,
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
    };
}

const PayingPopupContent: React.FC<{data: StudentInfoData}> = ({
    data,
}): ReactElement => {
    const {toast} = useToast();
    const params = useParams();
    const memoHandler = useCallback(handler, []);
    const [selectedParentId, setSelectedParentId] = useState<string | null>(
        null
    );
    const memoEvent: UseActionOptions<OutputType> = useMemo(() => {
        return {
            onSuccess: () => {
                toast({
                    title: "Success",
                    description: "Payment completed",
                });

                window.location.reload();
            },
            onError: (error) => {
                toast({
                    title: "Error processing payments",
                    variant: "destructive",
                    description: error,
                });
            },
        };
    }, [toast]);
    const {execute, isLoading} = useAction(memoHandler, memoEvent);
    const [rowSelection, setRowSelection] = React.useState({});
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 4,
    });
    const [totalAmountNoDiscount, setTotalAmountNoDiscount] = React.useState(0);
    const [totalAmountWithDiscount, setTotalAmountWithDiscount] =
        React.useState(0);
    const disabled = totalAmountNoDiscount === 0 || !selectedParentId;

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

    const columns: ColumnDef<PayingPopupData>[] = [];
    for (const key in payingPopupDictionary) {
        if (key === "select") {
            columns.push(createSelectColumns(key, handleSelectAllChange));
        } else {
            columns.push(createNormalColumns(key, payingPopupDictionary[key]));
        }
    }

    const [columnFilters, setColumnFilters] =
        React.useState<ColumnFiltersState>([
            {id: "status", value: PayingPopupStatus.DEBT},
        ]);

    const table = useReactTable({
        data: data.payments,
        columns: columns,
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

    function handlePayment() {
        const payments: Payment[] = table
            .getSelectedRowModel()
            .rows.map((row) => {
                const [month, year] = row.original.time.split(",");
                return {
                    year: Number(year.trim()),
                    month: findMonthByName(month.trim(), true),
                    amount: Number(row.original.monthlyFee),
                } as Payment;
            });

        const payload = {
            referTeacherId: String(params.teacherId),
            studentId: data.id,
            classId: String(params.classId),
            parentId: selectedParentId!,
            discount: Number(data.discount),
            payments: payments,
        } as InputType;

        execute(payload);
    }

    useEffect(() => {
        calculateTotals();
    }, [rowSelection, calculateTotals]);

    return (
        <>
            <div className="grid grid-cols-2 gap-x-4">
                <PayingPopupTable table={table} />
                <div className="min-h-[300px]">
                    <PayingPopupParentSelector
                        data={data}
                        onParentSelect={(parentId) =>
                            setSelectedParentId(parentId)
                        }
                    />
                    <PayingPopupTotalAmountNoDiscount
                        totalAmountNoDiscount={totalAmountNoDiscount}
                    />
                    <div className="mb-3.5 grid grid-cols-2 gap-x-3">
                        <PayingPopupDiscount discount={data.discount} />
                        <PayingPopupTotalAmountDiscount
                            totalAmountWithDiscount={totalAmountWithDiscount}
                        />
                    </div>
                    <PayingPopupButtonPay
                        disabled={disabled}
                        isLoading={isLoading}
                        onClick={handlePayment}
                    />
                </div>
            </div>
        </>
    );
};

export default PayingPopupContent;
