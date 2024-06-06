"Use client";

import React from "react";
import {ClassInfo} from "./class-info";
import {DummyData} from "./dummy-data";
import TeacherTableColumns from "./teacher-table-columns";
import TablePagination from "./table-pagination";
import TableFilter from "./table-filter";
import TableContent from "./table-content";
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

const columns: ColumnDef<ClassInfo>[] = TeacherTableColumns;

export function TeacherTable() {
    const data: ClassInfo[] = DummyData;
    const [sorting, _setSorting] = React.useState<SortingState>([]);
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5,
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
            <div className="w-[80%] pt-[120px]">
                <TableFilter table={table} />
                <TableContent table={table} columns={columns} />
                <TablePagination table={table} />
            </div>
        </>
    );
}
