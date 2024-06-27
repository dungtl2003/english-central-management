import React, {ReactElement} from "react";
import {DesiredClassColumns, desiredClassColumnsDictionary} from "./types";
import {desiredClassTestData} from "./test-data";
import DesiredClassTablePagination from "./desired-class-table-pagination";
import DesiredClassTableFilter from "./desired-class-table-filter";
import DesiredClassTableContent from "./desired-class-table-content";
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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {ArrowUpDown, MoreHorizontal} from "lucide-react";
import {Button} from "@/components/ui/button";
import {TabsContent} from "@/components/ui/tabs";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

function createColumns(
    key: string,
    title: string
): ColumnDef<DesiredClassColumns> {
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

const classListTableColumns: ColumnDef<DesiredClassColumns>[] = [];
for (const key in desiredClassColumnsDictionary) {
    if (key !== "actions") {
        classListTableColumns.push(
            createColumns(key, desiredClassColumnsDictionary[key])
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
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    className="py-0 px-2 m-0 w-full justify-start"
                                    variant="ghostSuccess"
                                >
                                    Approve
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="h-[180px]">
                                <AlertDialogHeader className="flex items-center justify-center">
                                    <AlertDialogTitle className="flex items-center justify-center text-2xl">
                                        Are you absolutely sure?
                                    </AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="grid grid-cols-2 items-center ">
                                    <AlertDialogCancel className="min-w-[160px] text-md justify-self-center">
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction className="min-w-[160px] text-md justify-self-center">
                                        Save
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    className="py-0 px-2 m-0 w-full justify-start"
                                    variant="ghostDanger"
                                >
                                    Reject
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent className="h-[180px]">
                                <AlertDialogHeader className="flex items-center justify-center">
                                    <AlertDialogTitle className="flex items-center justify-center text-2xl">
                                        Are you absolutely sure?
                                    </AlertDialogTitle>
                                </AlertDialogHeader>
                                <AlertDialogFooter className="grid grid-cols-2 items-center ">
                                    <AlertDialogCancel className="min-w-[160px] text-md justify-self-center">
                                        Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction className="min-w-[160px] text-md justify-self-center">
                                        Save
                                    </AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
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

const columns: ColumnDef<DesiredClassColumns>[] = classListTableColumns;

const DesiredClassTab = (): ReactElement => {
    const data: DesiredClassColumns[] = desiredClassTestData;
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
        <TabsContent value="desiredClass">
            <DesiredClassTableFilter table={table} />
            <DesiredClassTableContent table={table} columns={columns} />
            <DesiredClassTablePagination table={table} />
        </TabsContent>
    );
};

export default DesiredClassTab;
