import React, {
    ReactElement,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from "react";
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
import {TeacherListData} from "./types";
import TeacherListFilter from "./teacher-list-filter";
import TeacherListPagination from "./teacher-list-pagination";
import TeacherListContent from "./teacher-list-content";
import {Status} from "./teacher-list-rows-filter";
import {handle} from "@/lib/action/admin/get-teachers";
import {OutputType} from "@/lib/action/admin/get-teachers/types";
import {format} from "date-fns";
import {UseActionOptions, useAction} from "@/hooks/use-action";
import {toast} from "@/components/ui/use-toast";
import {
    SkeletonTeacherListContent,
    SkeletonTeacherListFilter,
    SkeletonTeacherListPagination,
} from "./skeleton";
import {TeacherListInfoDictionary} from "./types";
import {ArrowUpDown} from "lucide-react";
import {Button} from "@/components/ui/button";
import {FaArrowUpRightFromSquare} from "react-icons/fa6";
import Link from "next/link";
import {useUser} from "@clerk/nextjs";

function createColumns(key: string, title: string): ColumnDef<TeacherListData> {
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

const createTableColumns = (
    currentUrl: string
): ColumnDef<TeacherListData>[] => {
    const TeacherListColumns: ColumnDef<TeacherListData>[] = [];
    for (const key in TeacherListInfoDictionary) {
        TeacherListColumns.push(
            createColumns(key, TeacherListInfoDictionary[key])
        );
    }

    TeacherListColumns.push({
        id: "actions",
        enableHiding: false,
        cell: ({row}) => (
            <Link href={currentUrl + "/" + row.original.teacherId}>
                <Button variant="outline">
                    Detail
                    <span className="pl-2">
                        <FaArrowUpRightFromSquare size={13} />
                    </span>
                </Button>
            </Link>
        ),
    });
    return TeacherListColumns;
};

const formatData = (data: OutputType | undefined): TeacherListData[] => {
    if (!data) return [];
    const teachers: TeacherListData[] = [];
    data.forEach((element) => {
        const teacher: TeacherListData = {
            teacherId: element.id,
            fullName: element.user.lastName + " " + element.user.firstName,
            salary: element.acceptedAt
                ? getMonthlySalary(
                      Number(element.baseSalary),
                      element.acceptedAt
                  ).toString()
                : "0",
            startDate: element.acceptedAt
                ? format(element.acceptedAt as Date, "yyyy-MM-dd")
                : "___",
            status: element.status,
        };
        teachers.push(teacher);
    });
    return teachers;
};

function getMonthlySalary(baseSalary: number, acceptedAt: Date): number {
    return (
        baseSalary *
        (1 +
            (new Date().getFullYear() - new Date(acceptedAt).getFullYear()) /
                10)
    );
}

const TeacherListTable = (): ReactElement => {
    const {user} = useUser();
    const currentUrl = `/admins/${user?.id}/teachers`;

    const columns: ColumnDef<TeacherListData>[] =
        createTableColumns(currentUrl);

    const [teachers, setTeachers] = useState<TeacherListData[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = useCallback(handle, []);
    const event: UseActionOptions<OutputType> = useMemo(() => {
        return {
            onError: (error: string) => {
                console.log("Error: ", error);
                toast({
                    title: "error",
                    variant: "destructive",
                    description: "Get teachers failed",
                });
                setIsLoading(false);
            },
            onSuccess: (data: OutputType) => {
                setTeachers(formatData(data));
                setIsLoading(false);
            },
        };
    }, []);
    const {execute} = useAction<void, OutputType>(fetchData, event);
    useEffect(() => {
        execute();
    }, [execute]);

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
            return teachers;
        }
        return teachers.filter((row) => selectedStatus.includes(row.status));
    }, [teachers, selectedStatus]);

    const table = useReactTable<TeacherListData>({
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
        <div className="w-[80%] pt-[120px]">
            {isLoading && <SkeletonTeacherListFilter />}
            {!isLoading && (
                <TeacherListFilter
                    table={table}
                    selectedStatus={selectedStatus}
                    handleStatusChange={handleStatusChange}
                />
            )}
            {isLoading && <SkeletonTeacherListContent />}
            {!isLoading && (
                <TeacherListContent table={table} columns={columns} />
            )}
            {isLoading && <SkeletonTeacherListPagination />}
            {!isLoading && <TeacherListPagination table={table} />}
        </div>
    );
};

export default TeacherListTable;
