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
import {
    ClassListModel,
    classListInfoDictionary,
    classListInfoArray,
    ClassStatistics,
    UnitModel,
    TeacherModel,
} from "./types";
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
import {UseActionOptions, useAction} from "@/hooks/use-action";
import {toast} from "@/components/ui/use-toast";
import {useUser} from "@clerk/nextjs";
import {concatName} from "@/lib/utils";
import {ClassStatus} from "./new-class/types";
import {format} from "date-fns";
import {handler as handlerFetchClasses} from "@/lib/action/admin/get-classes";
import {handler as handlerFetchUnits} from "@/lib/action/admin/get-units";
import {handler as handlerFetchTeachers} from "@/lib/action/admin/get-teachers";
import {
    InputType as InputTypeFetchClasses,
    OutputType as OutputTypeFetchClasses,
} from "@/lib/action/admin/get-classes/types";
import {
    InputType as InputTypeFetchUnits,
    OutputType as OutputTypeFetchUnits,
} from "@/lib/action/admin/get-units/types";
import {OutputType as OutputTypeFetchTeachers} from "@/lib/action/admin/get-teachers/types";
import {
    SkeletonClassListContent,
    SkeletonClassListFilter,
    SkeletonClassListPagination,
} from "./skeleton";

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

function getClassListStatistics(data: ClassListModel[]) {
    const stats: ClassStatistics = {
        total: 0,
        active: 0,
        waiting: 0,
        closed: 0,
    };

    for (const cls of data) {
        stats.total++;
        if (cls.status === ClassStatus.ACTIVE) {
            stats.active++;
        } else if (cls.status === ClassStatus.WAITING) {
            stats.waiting++;
        } else if (cls.status === ClassStatus.CLOSED) {
            stats.closed++;
        }
    }

    return stats;
}

export const tableFields: string[] = [
    "className",
    "year",
    "students",
    "waiting",
    "teacher",
    "status",
];

const createTableColumns = (
    currentUrl: string
): ColumnDef<ClassListModel>[] => {
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
                                <Link
                                    href={
                                        currentUrl + "/" + row.original.classId
                                    }
                                >
                                    <Button>
                                        Detail
                                        <span className="pl-2">
                                            <FaArrowUpRightFromSquare
                                                size={13}
                                            />
                                        </span>
                                    </Button>
                                </Link>
                            </SheetClose>
                        </SheetFooter>
                    </SheetContent>
                </Sheet>
                <Link href={currentUrl + "/" + row.original.classId}>
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

    return classListColumns;
};

const formatDataClasses = (data: OutputTypeFetchClasses): ClassListModel[] => {
    const classes: ClassListModel[] = [];
    data.forEach((element) => {
        const aClass: ClassListModel = {
            classId: element.id,
            className: element.unit.grade + "." + element.index,
            year: element.unit.year.toString(),
            students:
                element.numOfJoinedStudents + "/" + element.unit.maxStudents,
            waiting: element.numOfPendingStudents.toString(),
            teacher: concatName(
                element.teacher.user.firstName,
                element.teacher.user.lastName,
                true
            ),
            status: element.closedAt
                ? ClassStatus.CLOSED
                : element.startTime < new Date()
                  ? ClassStatus.WAITING
                  : ClassStatus.ACTIVE,
            // schedule: "",
            // progress: "",
            startDate: format(element.startTime, "yyyy-MM-dd"),
            endDate: format(element.endTime, "yyyy-MM-dd"),
        };
        classes.push(aClass);
    });

    return classes;
};

const formatDataUnits = (data: OutputTypeFetchUnits): UnitModel[] => {
    const units: UnitModel[] = [];

    data.forEach((element) => {
        const unit: UnitModel = {
            unitId: element.id,
            grade: element.grade.toString(),
            year: element.year.toString(),
            pricePerSession: element.pricePerSession.toString(),
            maxSessions: element.maxSessions.toString(),
            maxStudents: element.maxStudents.toString(),
            studyTime: {
                hours: element.studyHour.toString(),
                minutes: element.studyMinute.toString(),
                seconds: element.studySecond.toString(),
            },
        };
        units.push(unit);
    });

    return units;
};

const formatDataTeachers = (data: OutputTypeFetchTeachers): TeacherModel[] => {
    const teachers: TeacherModel[] = [];

    data.forEach((element) => {
        const teacher: TeacherModel = {
            teacherId: element.id,
            fullName:
                concatName(
                    element.user.firstName,
                    element.user.lastName,
                    true
                ) || "___",
            birthday: element.user.birthday
                ? format(element.user.birthday, "yyyy-MM-dd")
                : "___",
            createDate: format(element.user.createdAt, "yyyy-MM-dd"),
        };
        teachers.push(teacher);
    });

    return teachers;
};

const ClassListTable = (): ReactElement => {
    const {user} = useUser();
    const currentUrl = `/admins/${user?.id}/classes`;
    const [isLoadingClasses, setIsLoadingClasses] = useState(true);
    const [isLoadingUnits, setIsLoadingUnits] = useState(true);
    const [isLoadingTeachers, setIsLoadingTeachers] = useState(true);

    const columns: ColumnDef<ClassListModel>[] = createTableColumns(currentUrl);

    const [classes, setClasses] = useState<ClassListModel[]>([]);
    const fetchClasses = useCallback(handlerFetchClasses, []);
    const [statistics, setStatistics] = useState<ClassStatistics>(
        getClassListStatistics(classes)
    );
    const eventFetchClasses: UseActionOptions<OutputTypeFetchClasses> =
        useMemo(() => {
            return {
                onError: (error: string) => {
                    console.error("Error: ", error);
                    toast({
                        title: "error",
                        variant: "destructive",
                        description: "Get classes failed",
                    });
                },
                onSuccess: (data: OutputTypeFetchClasses) => {
                    toast({
                        title: "Success",
                        variant: "success",
                        description: "Get classes succeed",
                    });
                    setClasses(formatDataClasses(data));
                    setStatistics(
                        getClassListStatistics(formatDataClasses(data))
                    );
                    setIsLoadingClasses(false);
                },
            };
        }, []);

    const {execute: execFetchClasses} = useAction<
        InputTypeFetchClasses,
        OutputTypeFetchClasses
    >(fetchClasses, eventFetchClasses);

    const [units, setUnits] = useState<UnitModel[]>([]);
    const fetchUnits = useCallback(handlerFetchUnits, []);
    const eventFetchUnits: UseActionOptions<OutputTypeFetchUnits> =
        useMemo(() => {
            return {
                onError: (error: string) => {
                    console.error("Error: ", error);
                    toast({
                        title: "error",
                        variant: "destructive",
                        description: "Get units failed",
                    });
                },
                onSuccess: (data: OutputTypeFetchUnits) => {
                    toast({
                        title: "Success",
                        variant: "success",
                        description: "Get units succeed",
                    });
                    setUnits(formatDataUnits(data));
                    setIsLoadingUnits(false);
                },
            };
        }, []);
    const {execute: execFetchUnits} = useAction<
        InputTypeFetchUnits,
        OutputTypeFetchUnits
    >(fetchUnits, eventFetchUnits);

    const [teachers, setTeachers] = useState<TeacherModel[]>([]);
    const fetchTeachers = useCallback(handlerFetchTeachers, []);
    const eventFetchTeachers: UseActionOptions<OutputTypeFetchTeachers> =
        useMemo(() => {
            return {
                onError: (error: string) => {
                    console.error("Error: ", error);
                    toast({
                        title: "error",
                        variant: "destructive",
                        description: "Get teachers failed",
                    });
                },
                onSuccess: (data: OutputTypeFetchTeachers) => {
                    toast({
                        title: "Success",
                        variant: "success",
                        description: "Get teachers succeed",
                    });
                    setTeachers(formatDataTeachers(data));
                    setIsLoadingTeachers(false);
                },
            };
        }, []);
    const {execute: execFetchTeachers} = useAction<
        void,
        OutputTypeFetchTeachers
    >(fetchTeachers, eventFetchTeachers);

    useEffect(() => {
        execFetchClasses();
        execFetchUnits();
        execFetchTeachers();
    }, [execFetchClasses, execFetchUnits, execFetchTeachers]);

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
            return classes;
        }
        return classes.filter((row) => selectedStatus.includes(row.status));
    }, [classes, selectedStatus]);

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
            {(isLoadingClasses || isLoadingTeachers || isLoadingUnits) && (
                <SkeletonClassListFilter />
            )}
            {!isLoadingClasses && !isLoadingTeachers && !isLoadingUnits && (
                <ClassListFilter
                    table={table}
                    selectedStatus={selectedStatus}
                    handleStatusChange={handleStatusChange}
                    stats={statistics}
                    tableColumns={tableFields}
                    units={units}
                    teachers={teachers}
                />
            )}
            {(isLoadingClasses || isLoadingTeachers || isLoadingUnits) && (
                <SkeletonClassListContent />
            )}
            {!isLoadingClasses && !isLoadingTeachers && !isLoadingUnits && (
                <ClassListContent table={table} columns={columns} />
            )}
            {(isLoadingClasses || isLoadingTeachers || isLoadingUnits) && (
                <SkeletonClassListPagination />
            )}
            {!isLoadingClasses && !isLoadingTeachers && !isLoadingUnits && (
                <ClassListPagination table={table} />
            )}
        </div>
    );
};

export default ClassListTable;
