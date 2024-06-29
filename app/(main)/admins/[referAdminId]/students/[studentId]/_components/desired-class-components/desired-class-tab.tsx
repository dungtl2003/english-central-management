import React, {ReactElement, useEffect, useMemo, useState} from "react";
import {DesiredClassColumns, desiredClassColumnsDictionary} from "./types";
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
import {StudentClassesData} from "../types";
import {format} from "date-fns";
import {useUser} from "@clerk/nextjs";
import {UseActionOptions, useAction} from "@/hooks/use-action";
import {toast} from "@/components/ui/use-toast";
import {OutputType} from "@/lib/action/admin/approve-student/types";
import {handler} from "@/lib/action/admin/approve-student";
import {Action} from "@/lib/action/admin/approve-student/schema";

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
const CreateTableColumns = (
    currentUrl: string,
    studentId: string
): ColumnDef<DesiredClassColumns>[] => {
    const approveEvent: UseActionOptions<OutputType> = useMemo(() => {
        return {
            onError: (error: string) => {
                console.error("Error: ", error);
                toast({
                    title: "error",
                    variant: "destructive",
                    description: `Fail to aprove this student`,
                });
            },
            onSuccess: () => {
                toast({
                    title: "Success",
                    variant: "success",
                    description: `Aprove this student successful`,
                });
                window.location.reload();
            },
        };
    }, []);
    const rejectEvent: UseActionOptions<OutputType> = useMemo(() => {
        return {
            onError: (error: string) => {
                console.error("Error: ", error);
                toast({
                    title: "error",
                    variant: "destructive",
                    description: `Fail to reject this student`,
                });
            },
            onSuccess: () => {
                toast({
                    title: "Success",
                    variant: "success",
                    description: `Reject this student successful`,
                });
                window.location.reload();
            },
        };
    }, []);

    const {execute: execApprove} = useAction(handler, approveEvent);
    const {execute: execReject} = useAction(handler, rejectEvent);

    const handleApprove = (classId: string) => {
        console.debug("approve button: ", classId);
        execApprove({
            classId: classId,
            studentId: studentId,
            action: Action.APPROVE,
        });
    };

    const handleReject = (classId: string) => {
        console.debug("reject button: ", classId);
        execReject({
            classId: classId,
            studentId: studentId,
            action: Action.REJECT,
        });
    };

    const classListTableColumns: ColumnDef<DesiredClassColumns>[] = [];

    for (const key in desiredClassColumnsDictionary) {
        if (key !== "actions") {
            classListTableColumns.push(
                createColumns(key, desiredClassColumnsDictionary[key])
            );
        } else {
            classListTableColumns.push({
                id: key,
                cell: ({row}) => (
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
                                            Are you sure?
                                        </AlertDialogTitle>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter className="grid grid-cols-2 items-center ">
                                        <AlertDialogCancel className="min-w-[160px] text-md justify-self-center">
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            className="min-w-[160px] text-md justify-self-center"
                                            onClick={() => {
                                                handleApprove(
                                                    row.original.classId
                                                );
                                            }}
                                        >
                                            Yes
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
                                            Are you sure?
                                        </AlertDialogTitle>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter className="grid grid-cols-2 items-center ">
                                        <AlertDialogCancel className="min-w-[160px] text-md justify-self-center">
                                            Cancel
                                        </AlertDialogCancel>
                                        <AlertDialogAction
                                            className="min-w-[160px] text-md justify-self-center"
                                            onClick={() => {
                                                handleReject(
                                                    row.original.classId
                                                );
                                            }}
                                        >
                                            Yes
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            <Link
                                href={
                                    currentUrl +
                                    "/classes/" +
                                    row.original.classId
                                }
                            >
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

    return classListTableColumns;
};

const formatData = (
    studentClassesData: StudentClassesData[]
): DesiredClassColumns[] => {
    if (studentClassesData.length === 0) return [];
    const desiredClassesData: DesiredClassColumns[] = [];
    studentClassesData.forEach((element) => {
        const desiredClassData: DesiredClassColumns = {
            classId: element.id,
            className: element.unit.grade + "." + element.index,
            startDate: format(element.startTime, "yyyy/MM/dd"),
            endDate: format(element.endTime, "yyyy/MM/dd"),
            year: element.unit.year.toString(),
            studentInClass:
                element.students.length + "/" + element.unit.maxStudents,
        };
        desiredClassesData.push(desiredClassData);
    });
    return desiredClassesData;
};

const DesiredClassTab = ({
    studentId,
    studentClassesData,
}: {
    studentId: string;
    studentClassesData: StudentClassesData[];
}): ReactElement => {
    const {user} = useUser();
    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;
    const [currentUrl, setCurrentUrl] = useState("");
    useEffect(() => {
        console.debug("......................");
        if (!user) return;
        setCurrentUrl(`${protocol}://${domain}/admins/${user!.id}`);
    }, [protocol, domain, user]);

    const columns: ColumnDef<DesiredClassColumns>[] = CreateTableColumns(
        currentUrl,
        studentId
    );

    const [data] = useState<DesiredClassColumns[]>(
        formatData(studentClassesData)
    );
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
