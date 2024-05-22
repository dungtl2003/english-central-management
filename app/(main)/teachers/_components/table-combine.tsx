"Use client";

import React from "react";
import {ClassInfo, ClassInfoDictionary, ClassInfoArray} from "./classInfoModel";
import {dummyData} from "./dummyData";
import {Button} from "@/components/ui/button";
import {ArrowUpDown, ChevronDown} from "lucide-react";
import {Input} from "@/components/ui/input";
import {RadioGroup} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";

import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetDescription,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    PaginationState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {CreateRadioItems} from "./radio-item";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

function createColumns(key: string, title: string): ColumnDef<ClassInfo> {
    return {
        accessorKey: key,
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() =>
                        column.toggleSorting(column.getIsSorted() !== "desc")
                    }
                >
                    {title}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
    };
}
const columns: ColumnDef<ClassInfo>[] = [];
for (const key in ClassInfoDictionary) {
    columns.push(createColumns(key, ClassInfoDictionary[key]));
}

columns.push({
    id: "actions",
    enableHiding: false,
    cell: () => {
        return (
            <div className="flex flex-row gap-x-4">
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="outline">Preview</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle>Class preview</SheetTitle>
                            <SheetDescription>
                                View more class properties. Click close when you
                                are done.
                            </SheetDescription>
                        </SheetHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label
                                    htmlFor="className"
                                    className="text-left"
                                >
                                    Class name
                                </Label>
                                <Input
                                    id="className"
                                    value=""
                                    className="col-span-3"
                                    disabled
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="year" className="text-left">
                                    Year
                                </Label>
                                <Input
                                    id="year"
                                    value=""
                                    className="col-span-3"
                                    disabled
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="start" className="text-left">
                                    Start
                                </Label>
                                <Input
                                    id="start"
                                    value=""
                                    className="col-span-3"
                                    disabled
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="end" className="text-left">
                                    End
                                </Label>
                                <Input
                                    id="end"
                                    value=""
                                    className="col-span-3"
                                    disabled
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="price" className="text-left">
                                    Price
                                </Label>
                                <Input
                                    id="price"
                                    value=""
                                    className="col-span-3"
                                    disabled
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="teacher" className="text-left">
                                    Teacher
                                </Label>
                                <Input
                                    id="teacher"
                                    value=""
                                    className="col-span-3"
                                    disabled
                                />
                            </div>
                        </div>
                        <SheetFooter>
                            <SheetClose asChild>
                                <Button type="submit">Close preview</Button>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
                <Button variant="outline">Detail</Button>
            </div>
        );
    },
});

export function TeacherTable() {
    const data: ClassInfo[] = dummyData;
    const [sorting, _setSorting] = React.useState<SortingState>([]);
    const [columnFilters, _setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, _setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, _setRowSelection] = React.useState({});
    const [filterType, _setFilterType] = React.useState("className");
    const [selectedRadio, _setSelectedRadio] = React.useState("className");
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 7,
    });

    const table = useReactTable({
        data,
        columns,
        onSortingChange: _setSorting,
        onColumnFiltersChange: _setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: _setColumnVisibility,
        onRowSelectionChange: _setRowSelection,
        onPaginationChange: setPagination,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
            pagination,
        },
    });

    const searchBar = React.useRef<HTMLInputElement>(null);
    const pageIndexInput = React.useRef<HTMLInputElement>(null);
    const handleRadioClick = (
        key: string,
        title: string,
        searchBar: React.RefObject<HTMLInputElement>
    ) => {
        searchBar.current?.setAttribute(
            "placeholder",
            `Filter by ${title.toLocaleLowerCase()}`
        );
        _setFilterType(key);
        _setSelectedRadio(key);
        table.setSorting([]);
        table.setColumnFilters([]);
        table.setColumnVisibility({});
        table.setRowSelection({});
    };

    return (
        <>
            <div className="w-11/12 pt-[120px]">
                <div className="flex items-center py-4">
                    <div className="flex flex-row gap-x-4">
                        <Input
                            placeholder={`Filter by ${ClassInfoDictionary[
                                "className"
                            ].toLowerCase()}`}
                            ref={searchBar}
                            value={
                                (table
                                    .getColumn(filterType)
                                    ?.getFilterValue() as string) ?? ""
                            }
                            onChange={(event) =>
                                table
                                    .getColumn(filterType)
                                    ?.setFilterValue(event.target.value)
                            }
                            className="w-[346px]"
                        />
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="">
                                    Filters{" "}
                                    <ChevronDown className="ml-2 h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <RadioGroup defaultValue="">
                                    {ClassInfoArray.map((obj) => (
                                        <CreateRadioItems
                                            key={obj.key}
                                            rkey={obj.key}
                                            title={obj.title}
                                            selectedRadio={selectedRadio}
                                            searchBar={searchBar}
                                            handleRadioClick={handleRadioClick}
                                        />
                                    ))}
                                </RadioGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="ml-auto">
                                Columns <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value) =>
                                                column.toggleVisibility(!!value)
                                            }
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <div className="rounded-md border">
                    <Table>
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (
                                            <TableHead key={header.id}>
                                                {header.isPlaceholder
                                                    ? null
                                                    : flexRender(
                                                          header.column
                                                              .columnDef.header,
                                                          header.getContext()
                                                      )}
                                            </TableHead>
                                        );
                                    })}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow
                                        key={row.id}
                                        data-state={
                                            row.getIsSelected() && "selected"
                                        }
                                    >
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell
                                                key={cell.id}
                                                className="w-2/12"
                                            >
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell
                                        colSpan={columns.length}
                                        className="h-24 text-center"
                                    >
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <div className="flex items-center justify-end space-x-2 py-4">
                    <div className="inline-flex flex-1">
                        <span className="flex items-center gap-1">
                            <div>Page</div>
                            <strong>
                                {table.getState().pagination.pageIndex + 1} of{" "}
                                {table.getPageCount().toLocaleString()}
                            </strong>
                        </span>
                        <span className="flex pl-1.5 items-center gap-1">
                            | Go to page:
                            <input
                                ref={pageIndexInput}
                                type="number"
                                defaultValue={
                                    table.getState().pagination.pageIndex + 1
                                }
                                onChange={(e) => {
                                    const page = e.target.value
                                        ? Number(e.target.value) - 1
                                        : 0;
                                    table.setPageIndex(page);
                                }}
                                className="border p-1 rounded w-16"
                            />
                        </span>
                    </div>
                    <div className="space-x-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
