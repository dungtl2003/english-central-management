"Use client";

import React from "react";
import {ClassInfo, ClassInfoDictionary, ClassInfoArray} from "./classInfoModel";
import {dummyData} from "./dummyData";
import {Button} from "@/components/ui/button";
import {ArrowUpDown, ChevronDown} from "lucide-react";
import {Input} from "@/components/ui/input";
import {RadioGroup} from "@/components/ui/radio-group";

import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
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

export function TeacherTable() {
    // const [data, _setData] = React.useState(() => [...dummyData]);
    const data: ClassInfo[] = dummyData;
    const [sorting, _setSorting] = React.useState<SortingState>([]);
    const [columnFilters, _setColumnFilters] =
        React.useState<ColumnFiltersState>([]);
    const [columnVisibility, _setColumnVisibility] =
        React.useState<VisibilityState>({});
    const [rowSelection, _setRowSelection] = React.useState({});
    const [filterType, _setFilterType] = React.useState("className");
    const [selectedRadio, _setSelectedRadio] = React.useState("className");

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
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });

    const searchBar = React.useRef<HTMLInputElement>(null);
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
                                            <TableCell key={cell.id}>
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
                    <div className="flex-1 text-sm text-muted-foreground">
                        {table.getFilteredSelectedRowModel().rows.length} of{" "}
                        {table.getFilteredRowModel().rows.length} row(s)
                        selected.
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
