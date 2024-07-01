import React, {ReactElement} from "react";
import {
    ColumnDef,
    PaginationState,
    SortingState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {parentListDummyData} from "./parent-list-dummy-data";
import ParentListFilter from "./parent-list-filter";
import ParentListPagination from "./parent-list-pagination";
import ParentListContent from "./parent-list-content";
import {ParentListModel, parentListInfoDictionary} from "./types";
import {ArrowUpDown} from "lucide-react";
import {Button} from "@/components/ui/button";
import {FaArrowUpRightFromSquare} from "react-icons/fa6";
import Link from "next/link";

function createColumns(key: string, title: string): ColumnDef<ParentListModel> {
    return {
        accessorKey: key,
        header: ({column}) => (
            <Button
                variant="ghost"
                onClick={() =>
                    column.toggleSorting(column.getIsSorted() !== "desc")
                }
            >
                {title}
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
    };
}

const StudentListColumns: ColumnDef<ParentListModel>[] = [];
for (const key in parentListInfoDictionary) {
    StudentListColumns.push(createColumns(key, parentListInfoDictionary[key]));
}

StudentListColumns.push({
    id: "actions",
    enableHiding: false,
    cell: () => (
        <Link href="/admins/1/parents/1">
            <Button variant="outline">
                Detail
                <span className="pl-2">
                    <FaArrowUpRightFromSquare size={13} />
                </span>
            </Button>
        </Link>
    ),
});

export const columns: ColumnDef<ParentListModel>[] = StudentListColumns;

const total: number = parentListDummyData.length;

const ParentListTable = (): ReactElement => {
    const [sorting, setSorting] = React.useState<SortingState>([
        {id: "hasDesireClass", desc: true},
    ]);

    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5,
    });

    const table = useReactTable({
        data: parentListDummyData,
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
        <div className="w-[80%] pt-[100px]">
            <ParentListFilter table={table} total={total} />
            <ParentListContent table={table} columns={columns} />
            <ParentListPagination table={table} />
        </div>
    );
};

export default ParentListTable;
