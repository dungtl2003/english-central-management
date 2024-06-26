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
import {studentListDummyData} from "./student-list-dummy-data";
import StudentListFilter from "./student-list-filter";
import StudentListPagination from "./student-list-pagination";
import StudentListContent from "./student-list-content";
import {Status} from "./student-list-rows-filter";
import {StudentListModel, StudentListInfoDictionary} from "./types";
import {ArrowUpDown} from "lucide-react";
import {Button} from "@/components/ui/button";
import {FaArrowUpRightFromSquare} from "react-icons/fa6";
import Link from "next/link";

function createColumns(
    key: string,
    title: string
): ColumnDef<StudentListModel> {
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

const StudentListColumns: ColumnDef<StudentListModel>[] = [];
for (const key in StudentListInfoDictionary) {
    StudentListColumns.push(createColumns(key, StudentListInfoDictionary[key]));
}

StudentListColumns.push({
    id: "actions",
    enableHiding: false,
    cell: () => (
        <Link href="/admins/1/students/1">
            <Button variant="outline">
                Detail
                <span className="pl-2">
                    <FaArrowUpRightFromSquare size={13} />
                </span>
            </Button>
        </Link>
    ),
});

export const columns: ColumnDef<StudentListModel>[] = StudentListColumns;

const StudentListTable = (): ReactElement => {
    const data: StudentListModel[] = studentListDummyData;
    const [sorting, setSorting] = React.useState<SortingState>([
        {id: "hasDesireClass", desc: true},
    ]);
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
        <div className="w-[80%] pt-[100px]">
            <StudentListFilter
                table={table}
                selectedStatus={selectedStatus}
                handleStatusChange={handleStatusChange}
            />
            <StudentListContent table={table} columns={columns} />
            <StudentListPagination table={table} />
        </div>
    );
};

export default StudentListTable;
