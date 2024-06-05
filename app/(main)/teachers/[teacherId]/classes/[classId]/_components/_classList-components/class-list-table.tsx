("Use client");

import React, {useState} from "react";
import {StudentInfo} from "../_attendance-components/student-info";
import ClassListTableColumns from "./class-list-table-columns";
import ClassListPagination from "./class-list-pagination";
import ClassListTableContent from "./class-list-table-content";
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
import {formatDate} from "@/lib/utils";

const formatData = (data: OutputType | undefined): StudentInfo[] => {
    const displayData: StudentInfo[] = [];

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

        displayData.push({
            fullName: `${student.student.user.lastName} ${student.student.user.firstName}`,
            email: student.student.user.email,
            birthday: student.student.user.birthday
                ? formatDate(new Date(student.student.user.birthday))
                : "",
            tuitionPaid: tuitionPaid,
        } as StudentInfo);
    });
    return displayData;
};

const columns: ColumnDef<StudentInfo>[] = ClassListTableColumns;
const fallbackDisplayData: StudentInfo[] = [];

const ClassListTable: React.FC<{
    data: OutputType | undefined;
}> = ({data}) => {
    const [displayData] = useState<StudentInfo[] | undefined>(formatData(data));
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
