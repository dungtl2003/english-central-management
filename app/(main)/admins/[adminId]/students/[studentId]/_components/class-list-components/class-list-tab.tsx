import React, {ReactElement} from "react";
import {ClasslistColumns, classListColumnsDictionary} from "./types";
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
import {ArrowUpDown, MoreHorizontal} from "lucide-react";
import {Button} from "@/components/ui/button";
import {TabsContent} from "@/components/ui/tabs";
import TuitionPopup from "./tuition-popup";
import AttendancePopup from "./attendance-popup";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

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

const classListTableColumns: ColumnDef<ClasslistColumns>[] = [];
for (const key in classListColumnsDictionary) {
    if (key !== "actions") {
        classListTableColumns.push(
            createColumns(key, classListColumnsDictionary[key])
        );
    } else {
        classListTableColumns.push({
            id: key,
            cell: () => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="grid grid-rows-3 max-w-fit"
                        align="end"
                    >
                        <AttendancePopup />
                        <TuitionPopup />
                        <Link href="/admins/1/classes/1">
                            <Button
                                className="py-0 px-2 m-0 w-full justify-start"
                                variant="ghost"
                            >
                                View detail
                            </Button>
                        </Link>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        });
    }
}

const columns: ColumnDef<ClasslistColumns>[] = classListTableColumns;

const StudentClassListTab = (): ReactElement => {
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

export default StudentClassListTab;
