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
import AttendancePopupFilter from "./attendance-popup-filter";
import AttendancePopupPagination from "./attendance-popup-pagination";
import AttendancePopupContent from "./attendance-popup-content";
import {statuses} from "./attendance-popup-rows-filter";
import {
    AttendancePopupColumns,
    attendancePopupColumnsDictionary,
} from "./types";
import {ArrowUpDown} from "lucide-react";
import {Button} from "@/components/ui/button";
import {AttendanceOfStudent} from "../types";

function createColumns(
    key: string,
    title: string
): ColumnDef<AttendancePopupColumns> {
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

const attendanceTableColumns: ColumnDef<AttendancePopupColumns>[] = [];
for (const key in attendancePopupColumnsDictionary) {
    attendanceTableColumns.push(
        createColumns(key, attendancePopupColumnsDictionary[key])
    );
}

export const columns: ColumnDef<AttendancePopupColumns>[] =
    attendanceTableColumns;

const AttendancePopupTable = ({
    attendanceTable,
}: {
    attendanceTable: {
        numberStudentsPresent: string;
        numberStudentsLate: string;
        numberStudentsAbsent: string;
    } & {
        attendances: AttendanceOfStudent[];
    };
}): ReactElement => {
    const data: AttendancePopupColumns[] =
        attendanceTable.attendances as AttendancePopupColumns[];
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
                    return newStatuses.length === statuses.length - 1
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
        return data.filter((row) =>
            selectedStatus.map((v) => v.toUpperCase()).includes(row.status)
        );
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
        <div className="w-full min-h-[405px]">
            <AttendancePopupFilter
                table={table}
                selectedStatus={selectedStatus}
                handleStatusChange={handleStatusChange}
                numberStudentsAbsent={attendanceTable.numberStudentsAbsent}
                numberStudentsLate={attendanceTable.numberStudentsLate}
                numberStudentsPresent={attendanceTable.numberStudentsPresent}
            />
            <AttendancePopupContent table={table} columns={columns} />
            <AttendancePopupPagination table={table} />
        </div>
    );
};

export default AttendancePopupTable;
