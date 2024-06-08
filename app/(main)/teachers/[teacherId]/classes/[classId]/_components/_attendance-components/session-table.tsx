("Use client");

import React, {ReactElement, useState} from "react";
import sessionTableColumns from "./session-table-columns";
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
import {SessionTableModel} from "./types";
import {format, add} from "date-fns";

const formatData = (data: OutputType | undefined): SessionTableModel[] => {
    const displayData: SessionTableModel[] = [];

    if (!data) return displayData;

    data.sessions.forEach((session) => {
        const startTime = session.actualStartTime ?? session.estimatedStartTime;
        const endTime = add(startTime, {
            hours: data.unit.studyHour,
            minutes: data.unit.studyMinute,
            seconds: data.unit.studySecond,
        });
        displayData.push({
            className: `${data.unit.grade}.${data.index}`,
            attendanceDate: startTime,
            formattedAttendanceDate: format(startTime, "dd/MM/yyyy"),
            startTime: format(startTime, "HH:mm:ss"),
            endTime: format(endTime, "HH:mm:ss"),
            presences:
                session.actualStartTime &&
                new Date(session.actualStartTime) > new Date()
                    ? `${
                          session.attendances.length -
                          session.attendances.filter(
                              (attendance) => attendance.status === "ABSENT"
                          ).length
                      }/${session.attendances.length}`
                    : "___",
            status: session.attendedTime !== null,
            students: [],
            studyHour: data.unit.studyHour,
            studyMinute: data.unit.studyMinute,
        });
    });

    return displayData;
};

const columns: ColumnDef<SessionTableModel>[] = sessionTableColumns;

const AttendanceTable: React.FC<{
    data: OutputType | undefined;
}> = ({data}): ReactElement => {
    const [displayData] = useState<SessionTableModel[]>(formatData(data));
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState<PaginationState>({
        pageIndex: 0,
        pageSize: 4,
    });

    const table = useReactTable({
        data: displayData,
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
                <SessionTableContent table={table} columns={columns} />
                <SessionTablePagination table={table} />
            </div>
        </>
    );
};

export default AttendanceTable;
