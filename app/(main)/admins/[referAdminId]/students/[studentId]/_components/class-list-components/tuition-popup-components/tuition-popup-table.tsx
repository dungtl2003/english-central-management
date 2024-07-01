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
import TuitionPopupFilter from "./tuition-popup-filter";
import TuitionPopupPagination from "./tuition-popup-pagination";
import TuitionPopupContent from "./tuition-popup-content";
import {Status} from "./tuition-popup-rows-filter";
import {TuitionPopupColumns, tuitionPopupColumnsDictionary} from "./types";
import {ArrowUpDown} from "lucide-react";
import {Button} from "@/components/ui/button";
import {TuitionOfStudent} from "../types";

function createColumns(
    key: string,
    title: string
): ColumnDef<TuitionPopupColumns> {
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

const tuitionTableColumns: ColumnDef<TuitionPopupColumns>[] = [];
for (const key in tuitionPopupColumnsDictionary) {
    tuitionTableColumns.push(
        createColumns(key, tuitionPopupColumnsDictionary[key])
    );
}

export const columns: ColumnDef<TuitionPopupColumns>[] = tuitionTableColumns;

const TuitionPopupTable = ({
    tuitionOfStudents,
}: {
    tuitionOfStudents: TuitionOfStudent[];
}): ReactElement => {
    const data: TuitionPopupColumns[] =
        tuitionOfStudents as TuitionPopupColumns[];
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
        <div className="w-full min-h-[405px]">
            <TuitionPopupFilter
                table={table}
                selectedStatus={selectedStatus}
                handleStatusChange={handleStatusChange}
            />
            <TuitionPopupContent table={table} columns={columns} />
            <TuitionPopupPagination table={table} />
        </div>
    );
};

export default TuitionPopupTable;
