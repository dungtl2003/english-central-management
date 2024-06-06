("Use client");

import React, {ReactElement} from "react";
import {SessionTableModel} from "./session-table-model";
import {SessionDummyData} from "./attendance-dummy-data";
import SessionTableColumns from "./session-table-columns";
import SessionTablePagination from "./session-table-pagination";
import SessionTableContent from "./session-table-content";
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
//import {formatDate} from "@/lib/utils";
//import {Time} from "@/lib/time";
//
//TODO: update data, it need to have number of presence students in sessions
//const formatData = (data: OutputType | undefined): SessionTableModel[] => {
//    const displayData: SessionTableModel[] = [];
//
//    if (!data) return displayData;
//
//    data.sessions.forEach((session) => {
//        const startTime = session.actualStartTime ?? session.estimatedStartTime;
//        displayData.push({
//            className: `${data.unit.grade}.${data.index}`,
//            attendanceDate: formatDate(new Date(startTime)),
//            startTime: Time.from(new Date(startTime)).toString(),
//            endTime: Time.from(new Date(startTime)).toString(),
//            presences: session.
//        });
//    });
//
//    return displayData;
//};

const columns: ColumnDef<SessionTableModel>[] = SessionTableColumns;

const AttendanceTable: React.FC<{
    data: OutputType | undefined;
}> = ({}): ReactElement => {
    const data: SessionTableModel[] = SessionDummyData;
    const [sorting, _setSorting] = React.useState<SortingState>([]);
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 4,
    });

    const table = useReactTable({
        data,
        columns,
        onSortingChange: _setSorting,
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
                <SessionTableContent table={table} columns={columns} />
                <SessionTablePagination table={table} />
            </div>
        </>
    );
};

export default AttendanceTable;
