("Use client");

import React, {ReactElement} from "react";
import {SessionDummyData} from "./attendance-dummy-data";
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
import {SessionTableModel, SessionTableDictionary} from "./types";
import {Button} from "@/components/ui/button";

function createColumns(
    key: string,
    title: string
): ColumnDef<SessionTableModel> {
    return {
        accessorKey: key,
        header: () => <Button variant="ghost">{title}</Button>,
    };
}

const SessionTableColumns: ColumnDef<SessionTableModel>[] = [];
for (const key in SessionTableDictionary) {
    SessionTableColumns.push(createColumns(key, SessionTableDictionary[key]));
}

const columns: ColumnDef<SessionTableModel>[] = SessionTableColumns;

const AttendanceTable = (): ReactElement => {
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
