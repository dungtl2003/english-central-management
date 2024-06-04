("Use client");

import React from "react";
import {StudentInfo} from "../_attendance-components/student-info";
import {StudentDummyData} from "../_attendance-components/student-dummy-data";
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

//interface DisplayData {
//    fullname: string;
//    email: string;
//    birthday: Date;
//    tutionFee: "All paid" | "In debt";
//}
//
//interface SessionsSameMonthYear {
//    [monthYear: string]: number;
//}
//
//interface TotalPriceNeedToPay {
//    month: number;
//    year: number;
//    total: number;
//}

//const formatData = (data: OutputType | undefined): DisplayData[] => {
//    const displayData: DisplayData[] = [];
//
//    if (!data) return displayData;
//
//    data!.students.forEach((student) => {
//        //handle case where 1 place still in older month than other
//        const todayAfter12Hours = new Date();
//        todayAfter12Hours.setHours(todayAfter12Hours.getHours() + 12);
//
//        const todayUTCMonthAfter12Hours = todayAfter12Hours.getUTCMonth();
//        const todayUTCYearAfter12Hours = todayAfter12Hours.getUTCFullYear();
//
//        const sessionsSameMonthYear = data.sessions
//            .filter((session) => {
//                const attendedTime = session.attendedTime;
//                if (
//                    !attendedTime ||
//                    attendedTime.getUTCFullYear() > todayUTCYearAfter12Hours ||
//                    (attendedTime.getUTCFullYear() ===
//                        todayUTCYearAfter12Hours &&
//                        attendedTime.getUTCMonth() >= todayUTCMonthAfter12Hours)
//                ) {
//                    return false;
//                }
//
//                for (const attendance of student.student.attendances) {
//                    if (attendance.sessionId === session.id) return true;
//                }
//
//                return false;
//            })
//            .reduce((result, curr) => {
//                const key = `${curr.attendedTime!.getUTCMonth()}_${curr.attendedTime!.getUTCFullYear()}`;
//                return {
//                    ...result,
//                    [key]: (result[key] ?? 0) + 1,
//                } as SessionsSameMonthYear;
//            }, {} as SessionsSameMonthYear);
//
//        const totalPriceNeedToPay = student.student.tuitions
//            .filter(
//                (tuition) =>
//                    tuition.classId === data.id &&
//                    !(
//                        `${tuition.month}_${tuition.year}` in
//                        sessionsSameMonthYear
//                    )
//            )
//            .map((tuition) => {
//                return {
//                    month: tuition.month,
//                    year: tuition.year,
//                    total:
//                        (sessionsSameMonthYear[
//                            `${tuition.month}_${tuition.year}`
//                        ] *
//                            data.unit.pricePerSession.toNumber() *
//                            student.student.discount) /
//                        100,
//                } as TotalPriceNeedToPay;
//            });
//        displayData.push({
//            fullname: `${student.student.user.lastName} ${student.student.user.firstName}`,
//            email: student.student.user.email,
//            birthday: student.student.user.birthday,
//        } as DisplayData);
//    });
//    return displayData;
//};

const columns: ColumnDef<StudentInfo>[] = ClassListTableColumns;
//const fallbackData: DisplayData[] = [];

const ClassListTable: React.FC<{
    data: OutputType | undefined;
}> = () => {
    const data: StudentInfo[] = StudentDummyData;
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 4,
    });

    const table = useReactTable({
        data,
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
