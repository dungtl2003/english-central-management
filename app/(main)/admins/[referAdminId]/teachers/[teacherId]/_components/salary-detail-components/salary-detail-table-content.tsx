import {ReactElement, useEffect, useMemo, useState} from "react";
import {flexRender, Table} from "@tanstack/react-table";
import {SalaryDetailTableData} from "./types";
import {
    TableHead,
    TableHeader,
    TableRow,
    TableBody,
    TableCell,
} from "@/components/ui/table";
import {Button} from "@/components/ui/button";
import {UseActionOptions, useAction} from "@/hooks/use-action";
import {toast} from "@/components/ui/use-toast";
import {TeacherStatus} from "@prisma/client";
import {handler} from "@/lib/action/admin/pay-teacher";
import {InputType, OutputType} from "@/lib/action/admin/pay-teacher/types";

const SalaryDetailTableContent = ({
    setIsUpdating,
    teacherId,
    teacherStatus,
    table,
    selectedTotal,
}: {
    setIsUpdating: (v: boolean) => void;
    table: Table<SalaryDetailTableData>;
    teacherStatus: TeacherStatus;
    selectedTotal: number;
    teacherId: string;
}): ReactElement => {
    const [haveSelection, setHaveSelection] = useState(false);
    const numberRowsSelected = table.getSelectedRowModel().rows.length;
    useEffect(() => {
        setHaveSelection(numberRowsSelected !== 0);
    }, [numberRowsSelected]);

    const dataPayment: {
        salary: number;
        year: number;
        month: number;
    }[] = [];

    const eventPay: UseActionOptions<OutputType> = useMemo(() => {
        return {
            onError: (error: string) => {
                console.error("Error: ", error);
                toast({
                    title: "error",
                    variant: "destructive",
                    description: "Payment process failed",
                });
            },
            onSuccess: () => {
                toast({
                    title: "success",
                    variant: "success",
                    description: "Payment process succeed",
                });
                setIsUpdating(false);
                window.location.reload();
            },
        };
    }, [setIsUpdating]);
    const {execute} = useAction<InputType, OutputType>(handler, eventPay);

    const handlePay = () => {
        table.getSelectedRowModel().rows.forEach((row) => {
            dataPayment.push({
                month: Number(row.original.month) - 1,
                year: Number(row.original.year),
                salary: Number(row.original.amount),
            });
        });

        setIsUpdating(true);
        execute({
            teacherId: teacherId,
            monthlyPayments: dataPayment,
        });
    };

    return (
        <>
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
            <TableBody>
                {table.getRowModel().rows?.length ? (
                    table.getRowModel().rows.map((row) => (
                        <TableRow
                            key={row.id}
                            className={
                                row.original.status === "PAID"
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
                <TableRow>
                    <TableCell colSpan={table.getAllColumns().length - 2}>
                        Total
                    </TableCell>
                    <TableCell className="text-green-500">
                        ${selectedTotal.toFixed(2)}
                    </TableCell>
                    <TableCell>
                        <Button
                            onClick={handlePay}
                            disabled={
                                teacherStatus === "PENDING" ||
                                teacherStatus === "DELETED" ||
                                teacherStatus === "REJECTED" ||
                                !haveSelection
                            }
                        >
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
                    </TableCell>
                </TableRow>
            </TableBody>
        </>
    );
};

export default SalaryDetailTableContent;
