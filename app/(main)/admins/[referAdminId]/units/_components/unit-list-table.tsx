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
import {unitListDummyData} from "./unit-list-dummy-data";
import UnitListFilter from "./unit-list-filter";
import UnitListPagination from "./unit-list-pagination";
import UnitListContent from "./unit-list-content";
import {UnitListModel, unitListInfoDictionary} from "./types";
import {ArrowUpDown} from "lucide-react";
import {Button} from "@/components/ui/button";
import {FaArrowUpRightFromSquare} from "react-icons/fa6";
import Link from "next/link";

function createColumns(key: string, title: string): ColumnDef<UnitListModel> {
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

const UnitListColumns: ColumnDef<UnitListModel>[] = [];
for (const key in unitListInfoDictionary) {
    UnitListColumns.push(createColumns(key, unitListInfoDictionary[key]));
}

UnitListColumns.push({
    id: "actions",
    enableHiding: false,
    cell: () => (
        <Link href="/admins/1/units/1">
            <Button variant="outline">
                Detail
                <span className="pl-2">
                    <FaArrowUpRightFromSquare size={13} />
                </span>
            </Button>
        </Link>
    ),
});

export const columns: ColumnDef<UnitListModel>[] = UnitListColumns;

const UnitListTable = (): ReactElement => {
    const data: UnitListModel[] = unitListDummyData;
    const [sorting, setSorting] = React.useState<SortingState>([
        {id: "hasDesireClass", desc: true},
    ]);

    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5,
    });

    const table = useReactTable({
        data: data,
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
            <UnitListFilter table={table} />
            <UnitListContent table={table} columns={columns} />
            <UnitListPagination table={table} />
        </div>
    );
};

export default UnitListTable;
