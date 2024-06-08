("Use client");

import React, {useState} from "react";
import {
    ColumnDef,
    SortingState,
    PaginationState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {OutputType} from "@/lib/action/teacher/get-class-detail/types";
import {concatName, monthNumberToLabelMap} from "@/lib/utils";
import ClassListTableColumns from "./student-list-table-columns";
import ClassListTableContent from "./student-list-table-content";
import ClassListPagination from "./student-list-pagination";
import {
    ParentInfoData,
    PayingPopupData,
    PayingPopupStatus,
    StudentInfoData,
} from "./types";
import {format} from "date-fns";

const formatData = (data: OutputType | undefined): StudentInfoData[] => {
    const displayData: StudentInfoData[] = [];

    if (!data) return displayData;

    data!.students.forEach((student) => {
        let tuitionPaid = "All paid";
        for (const priceByMonthYear of student.student
            .totalPriceByMonthYearList) {
            if (!priceByMonthYear.isPaid) {
                tuitionPaid = "In debt";
                break;
            }
        }

        const payments = student.student.totalPriceByMonthYearList.map(
            (totalPriceByMonthYear) => {
                return {
                    time: `${
                        monthNumberToLabelMap[totalPriceByMonthYear.month][
                            "short"
                        ]
                    }, ${totalPriceByMonthYear.year}`,
                    attendances: totalPriceByMonthYear.attendances.toString(),
                    monthlyFee: totalPriceByMonthYear.totalPrice.toString(),
                    status: totalPriceByMonthYear.isPaid
                        ? PayingPopupStatus.PAID
                        : PayingPopupStatus.DEBT,
                } as PayingPopupData;
            }
        );

        const parents = student.student.parents.map((parent) => {
            return {
                id: parent.id,
                fullName: concatName(
                    parent.user.firstName,
                    parent.user.lastName,
                    true
                ),
            } as ParentInfoData;
        });

        displayData.push({
            id: student.student.id,
            fullName: `${student.student.user.lastName} ${student.student.user.firstName}`,
            email: student.student.user.email,
            birthday: student.student.user.birthday
                ? format(student.student.user.birthday, "dd/MM/yyyy")
                : "",
            tuitionPaid: tuitionPaid,
            phoneNumber: student.student.user.phoneNumber,
            gender: student.student.user.gender ?? "Not set",
            payments: payments,
            discount: student.student.discount.toString(),
            parents: parents,
        } as StudentInfoData);
    });
    return displayData;
};

const columns: ColumnDef<StudentInfoData>[] = ClassListTableColumns;
const fallbackDisplayData: StudentInfoData[] = [];

const ClassListTable: React.FC<{
    data: OutputType | undefined;
}> = ({data}) => {
    const [displayData] = useState<StudentInfoData[]>(formatData(data));
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 4,
    });

    const table = useReactTable({
        data: displayData ?? fallbackDisplayData,
        columns,
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onPaginationChange: setPagination,
        state: {
            sorting,
            pagination,
        },
    });
    return (
        <>
            <div className="w-full mt-5">
                <ClassListTableContent table={table} columns={columns} />
                <ClassListPagination table={table} />
            </div>
        </>
    );
};

export default ClassListTable;
