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
import {AttendanceTableModel, SessionTableModel} from "./types";
import {format, add} from "date-fns";
import {concatName} from "@/lib/utils";

const formatData = (data: OutputType | undefined): SessionTableModel[] => {
    const displayData: SessionTableModel[] = [];

    if (!data) return displayData;

    data.sessions
        .sort((s1, s2) => {
            const startTime1 = s1.actualStartTime ?? s1.estimatedStartTime;
            const startTime2 = s2.actualStartTime ?? s2.estimatedStartTime;

            if (
                (s1.attendedTime && s2.attendedTime) ||
                (!s1.attendedTime && !s2.attendedTime)
            ) {
                return (
                    new Date(startTime1).getTime() -
                    new Date(startTime2).getTime()
                );
            }

            return s1.attendedTime ? 1 : -1;
        })
        .forEach((session) => {
            const startTime =
                session.actualStartTime ?? session.estimatedStartTime;
            const endTime = add(startTime, {
                hours: data.unit.studyHour,
                minutes: data.unit.studyMinute,
                seconds: data.unit.studySecond,
            });
            const attendances: AttendanceTableModel[] = [];
            session.attendances.forEach((a) => {
                attendances.push({
                    attendanceId: a.id,
                    fullName: concatName(
                        a.student.user.firstName,
                        a.student.user.lastName,
                        true
                    ),
                    email: a.student.user.email,
                    attendanceStatus: a.status,
                    note: a.description,
                    status: a.status || "PRESENT",
                    description: a.description,
                } as AttendanceTableModel);
            });
            displayData.push({
                className: `${data.unit.grade}.${data.index}`,
                sessionId: session.id,
                estimatedStartTime: new Date(session.estimatedStartTime),
                actualStartTime: session.actualStartTime
                    ? new Date(session.actualStartTime)
                    : null,
                attendedTime: session.attendedTime
                    ? new Date(session.attendedTime)
                    : null,
                attendanceDate: format(startTime, "dd/MM/yyyy"),
                startTime: format(startTime, "HH:mm:ss"),
                endTime: format(endTime, "HH:mm:ss"),
                presences: session.attendedTime
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
                attendances: attendances,
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
