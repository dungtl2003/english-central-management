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
import StudentListFilter from "./student-list-filter";
import StudentListPagination from "./student-list-pagination";
import StudentListContent from "./student-list-content";
import {
    StudentListModel,
    StudentStatus,
    studentListInfoDictionary,
} from "./types";
import {ArrowUpDown} from "lucide-react";
import {Button} from "@/components/ui/button";
import {FaArrowUpRightFromSquare} from "react-icons/fa6";
import Link from "next/link";
import {useUser} from "@clerk/nextjs";
import {UseActionOptions, useAction} from "@/hooks/use-action";
import {OutputType} from "@/lib/action/admin/get-students/types";
import {handler} from "@/lib/action/admin/get-students";
import {toast} from "@/components/ui/use-toast";
import {concatName} from "@/lib/utils";
import {format} from "date-fns";
import {
    SkeletonStudentListContent,
    SkeletonStudentListFilter,
    SkeletonStudentListPagination,
} from "./skeleton";

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

const createTableColumns = (
    currentUrl: string
): ColumnDef<StudentListModel>[] => {
    const StudentListColumns: ColumnDef<StudentListModel>[] = [];

    for (const key in studentListInfoDictionary) {
        StudentListColumns.push(
            createColumns(key, studentListInfoDictionary[key])
        );
    }

    StudentListColumns.push({
        id: "actions",
        enableHiding: false,
        cell: ({row}) => (
            <Link href={currentUrl + row.original.studentId}>
                <Button variant="outline">
                    Detail
                    <span className="pl-2">
                        <FaArrowUpRightFromSquare size={13} />
                    </span>
                </Button>
            </Link>
        ),
    });

    return StudentListColumns;
};

const formatData = (data: OutputType | undefined): StudentListModel[] => {
    if (!data) return [];
    const teachers: StudentListModel[] = [];

    data.forEach((element) => {
        const teacher: StudentListModel = {
            studentId: element.id,
            fullName:
                concatName(
                    element.user.firstName,
                    element.user.lastName,
                    true
                ) || "___ ___",
            email: element.user.email,
            phoneNumber: element.user.phoneNumber || "___",
            birthday: element.user.birthday
                ? format(element.user.birthday, "yyyy/MM/dd")
                : "___/___/___",
            status: element.user.deletedAt
                ? StudentStatus.DELETED
                : StudentStatus.ACTIVE,
            hasDesireClass: element.isRequesting,
        };
        teachers.push(teacher);
    });

    return teachers;
};

const StudentListTable = (): ReactElement => {
    const {user} = useUser();

    const [students, setStudents] = useState<StudentListModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = useCallback(handler, []);
    const event: UseActionOptions<OutputType> = useMemo(() => {
        return {
            onError: (error: string) => {
                console.error("Error: ", error);
                toast({
                    title: "error",
                    variant: "destructive",
                    description: "Get students failed",
                });
            },
            onSuccess: (data: OutputType) => {
                toast({
                    title: "Success",
                    variant: "success",
                    description: "Get students succeed",
                });
                setStudents(formatData(data));
                setIsLoading(false);
            },
        };
    }, []);
    const {execute} = useAction<void, OutputType>(fetchData, event);
    useEffect(() => {
        execute();
    }, [execute]);

    const columns: ColumnDef<StudentListModel>[] = createTableColumns(
        "/admins/" + user?.id + "/students/"
    );
    const [sorting, setSorting] = React.useState<SortingState>([
        {id: "hasDesireClass", desc: true},
    ]);
    const [selectedStatus, setSelectedStatus] = React.useState<string>(
        StudentStatus.ALL
    );
    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5,
    });
    const handleStatusChange = React.useCallback((status: string) => {
        if (status === StudentStatus.ALL) {
            setSelectedStatus(StudentStatus.ALL);
        } else {
            setSelectedStatus((prev) => {
                if (prev === status) {
                    return StudentStatus.ALL;
                } else {
                    return status;
                }
            });
        }
    }, []);

    const filteredData = React.useMemo(() => {
        if (selectedStatus === StudentStatus.ALL) {
            return students;
        }
        return students.filter((row) => selectedStatus === row.status);
    }, [students, selectedStatus]);

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
            {isLoading && <SkeletonStudentListFilter />}
            {!isLoading && (
                <StudentListFilter
                    table={table}
                    selectedStatus={selectedStatus}
                    handleStatusChange={handleStatusChange}
                />
            )}
            {isLoading && <SkeletonStudentListContent />}
            {!isLoading && (
                <StudentListContent table={table} columns={columns} />
            )}
            {isLoading && <SkeletonStudentListPagination />}
            {!isLoading && <StudentListPagination table={table} />}
        </div>
    );
};

export default StudentListTable;
