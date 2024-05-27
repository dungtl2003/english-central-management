("Use client");

import React from "react";
import {ClassInfo} from "../../../../_components/class-info";
import {DummyData} from "../../../../_components/dummy-data";
import TeacherTableColumns from "../../../../_components/teacher-table-columns";
import TablePagination from "../../../../_components/table-pagination";
import TableFilter from "../../../../_components/table-filter";
import TableContent from "../../../../_components/table-content";
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

const ClassListTable = () => {
    const data: ClassInfo[] = DummyData;
    const [sorting, _setSorting] = React.useState<SortingState>([]);
    // Define how many rows can be display
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
            <div className="w-11/12 pt-[120px]">
                <TableFilter table={table} />
                <TableContent table={table} columns={columns} />
                <TablePagination table={table} />
            </div>
        </>
    );
};

export default ClassListTable;
