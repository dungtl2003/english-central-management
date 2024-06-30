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
import {
    ClassListModel,
    classListInfoDictionary,
    classListInfoArray,
    ClassStatistics,
} from "./types";
import {classListDummyData} from "./class-list-dummy-data";
import ClassListFilter from "./class-list-filter";
import ClassListPagination from "./class-list-pagination";
import ClassListContent from "./class-list-content";
import {Status} from "./class-list-rows-filter";
import {ArrowUpDown} from "lucide-react";
import {Button} from "@/components/ui/button";
import {FaArrowUpRightFromSquare} from "react-icons/fa6";
import Link from "next/link";
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
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";

function createColumns(key: string, title: string): ColumnDef<ClassListModel> {
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

// Đoạn này mô tả ý tưởng lấy số lượng của từng trạng thái
function getClassListStatistics(data: ClassListModel[]) {
    const stats: ClassStatistics = {
        total: 0,
        active: 0,
        waiting: 0,
        closed: 0,
    };

    for (const cls of data) {
        stats.total++;
        if (cls.status === "Active") {
            stats.active++;
        } else if (cls.status === "Waiting") {
            stats.waiting++;
        } else if (cls.status === "Closed") {
            stats.closed++;
        }
    }

    return stats;
}

const statistics: ClassStatistics = getClassListStatistics(classListDummyData);

export const tableFields: string[] = [
    "className",
    "grade",
    "students",
    "waiting",
    "teacher",
    "status",
];

const classListColumns: ColumnDef<ClassListModel>[] = [];

for (const key of tableFields) {
    classListColumns.push(createColumns(key, classListInfoDictionary[key]));
}

classListColumns.push({
    id: "actions",
    enableHiding: false,
    cell: ({row}) => (
        <div className="flex gap-x-3.5">
            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="outline">Preview</Button>
                </SheetTrigger>
                <SheetContent className="">
                    <SheetHeader>
                        <SheetTitle>Class preview</SheetTitle>
                        <SheetDescription>
                            View more class properties.
                        </SheetDescription>
                    </SheetHeader>
                    <div className="grid gap-4 py-4">
                        {classListInfoArray.map((obj) => {
                            const key = obj.key as keyof ClassListModel;
                            return (
                                <div
                                    key={obj.key}
                                    className="grid grid-cols-4 items-center gap-3"
                                >
                                    <Label
                                        htmlFor={obj.key}
                                        className="text-left"
                                    >
                                        {obj.title}
                                    </Label>
                                    <Input
                                        id={obj.key}
                                        value={row.original[key] || ""}
                                        className="col-span-3"
                                        readOnly
                                    />
                                </div>
                            );
                        })}
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Link href="/admins/1/classes/1">
                                <Button>
                                    Detail
                                    <span className="pl-2">
                                        <FaArrowUpRightFromSquare size={13} />
                                    </span>
                                </Button>
                            </Link>
                        </SheetClose>
                    </SheetFooter>
                </SheetContent>
            </Sheet>
            <Link href="/admins/1/classes/1">
                <Button variant="outline">
                    Detail
                    <span className="pl-2">
                        <FaArrowUpRightFromSquare size={13} />
                    </span>
                </Button>
            </Link>
        </div>
    ),
});

export const columns: ColumnDef<ClassListModel>[] = classListColumns;

const ClassListTable = (): ReactElement => {
    const data: ClassListModel[] = classListDummyData;
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [selectedStatus, setSelectedStatus] = React.useState<string[]>([
        "All",
    ]);
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5,
    });
    const handleStatusChange = React.useCallback((status: string) => {
        if (status === "All") {
            setSelectedStatus(["All"]);
        } else {
            setSelectedStatus((prev) => {
                if (prev.includes(status)) {
                    const newStatuses = prev.filter((s) => s !== status);
                    return newStatuses.length === 0 ? ["All"] : newStatuses;
                } else {
                    const newStatuses = [...prev, status].filter(
                        (s) => s !== "All"
                    );
                    return newStatuses.length === Status.length - 1
                        ? ["All"]
                        : newStatuses;
                }
            });
        }
    }, []);

    const filteredData = React.useMemo(() => {
        if (selectedStatus.includes("All")) {
            return data;
        }
        return data.filter((row) => selectedStatus.includes(row.status));
    }, [data, selectedStatus]);

    const table = useReactTable({
        data: filteredData,
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
        <div className="w-[85%] pt-[100px]">
            <ClassListFilter
                table={table}
                selectedStatus={selectedStatus}
                handleStatusChange={handleStatusChange}
                stats={statistics}
                tableColumns={tableFields}
            />
            <ClassListContent table={table} columns={columns} />
            <ClassListPagination table={table} />
        </div>
    );
};

export default ClassListTable;
