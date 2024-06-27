import React, {ReactElement} from "react";
import {ClasslistColumns, ClassListColumnsDictionary} from "./types";
import {ClassListTestData} from "./test-data";
import ClassListTablePagination from "./class-list-table-pagination";
import ClassListTableFilter from "./class-list-table-filter";
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
import {ArrowUpDown} from "lucide-react";
import {Button} from "@/components/ui/button";
import {TabsContent} from "@/components/ui/tabs";
import Link from "next/link";
import {FaArrowUpRightFromSquare} from "react-icons/fa6";

function createColumns(
    key: string,
    title: string
): ColumnDef<ClasslistColumns> {
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

const ClassListTableColumns: ColumnDef<ClasslistColumns>[] = [];
for (const key in ClassListColumnsDictionary) {
    ClassListTableColumns.push(
        createColumns(key, ClassListColumnsDictionary[key])
    );
}

ClassListTableColumns.push({
    id: "actions",
    enableHiding: false,
    cell: () => (
        <Link href="/admins/1/teachers/1">
            <Button variant="outline">
                Detail
                <span className="pl-2">
                    <FaArrowUpRightFromSquare size={13} />
                </span>
            </Button>
        </Link>
    ),
});

const columns: ColumnDef<ClasslistColumns>[] = ClassListTableColumns;

const ClassListTab = (): ReactElement => {
    const data: ClasslistColumns[] = ClassListTestData;
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
        <TabsContent value="classList">
            <ClassListTableFilter table={table} />
            <ClassListTableContent table={table} columns={columns} />
            <ClassListTablePagination table={table} />
        </TabsContent>
    );
};

export default ClassListTab;
