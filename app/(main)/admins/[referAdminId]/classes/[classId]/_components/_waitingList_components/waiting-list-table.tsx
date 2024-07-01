("Use client");

import React from "react";
import {StudentInfo, StudentInfoDictionary} from "./types";
import {waitingDummyData} from "./waiting-dummy-data";
import ClassListPagination from "./waiting-list-pagination";
import ClassListTableContent from "./waiting-list-table-content";
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
import {Button} from "@/components/ui/button";
import WaitingListAction from "./waiting-list-action";

function createColumns(key: string, title: string): ColumnDef<StudentInfo> {
    return {
        accessorKey: key,
        header: () => <Button variant="ghost">{title}</Button>,
    };
}

const ClassListTableColumns: ColumnDef<StudentInfo>[] = [];
for (const key in StudentInfoDictionary) {
    ClassListTableColumns.push(createColumns(key, StudentInfoDictionary[key]));
}

ClassListTableColumns.push({
    id: "actions",
    enableHiding: false,
    cell: () => <WaitingListAction />,
});

const columns: ColumnDef<StudentInfo>[] = ClassListTableColumns;

const WaitingListTable = () => {
    const data: StudentInfo[] = waitingDummyData;
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
                <ClassListTableContent table={table} columns={columns} />
                <ClassListPagination table={table} />
            </div>
        </>
    );
};

export default WaitingListTable;
