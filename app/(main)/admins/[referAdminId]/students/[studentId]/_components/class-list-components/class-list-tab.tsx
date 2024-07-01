import React, {ReactElement, useEffect, useState} from "react";
import {
    AttendanceOfStudent,
    ClasslistColumns,
    classListColumnsDictionary,
    CurrentClassStatus,
    PaymentStatus,
    TuitionOfStudent,
} from "./types";
import ClassListTablePagination from "./class-list-table-pagination";
import ClassListTableFilter from "./class-list-table-filter";
import ClassListTableContent from "./class-list-table-content";
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
import {ArrowUpDown, MoreHorizontal} from "lucide-react";
import {Button} from "@/components/ui/button";
import {TabsContent} from "@/components/ui/tabs";
import TuitionPopup from "./tuition-popup";
import AttendancePopup from "./attendance-popup";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import {StudentClassesData} from "../types";
import {add, format} from "date-fns";
import {Attendance, AttendanceStatus} from "@prisma/client";
import {useUser} from "@clerk/nextjs";

type keyValue = {
    [key: string]: number;
};

const formatData = (
    studentClassesData: StudentClassesData[],
    currentDiscount: number
): ClasslistColumns[] => {
    if (studentClassesData.length === 0) return [];
    const currentClassesData: ClasslistColumns[] = [];
    studentClassesData.forEach((element) => {
        const studentAttendances: AttendanceOfStudent[] = [];
        let numberStudentsAbsent: number = 0;
        let numberStudentsLate: number = 0;
        let numberStudentsPresent: number = 0;
        const numberSessionsGroupByMonth: keyValue = {};
        element.sessions.forEach((session) => {
            if (session.attendedTime && session.actualStartTime) {
                const attendance: Attendance = session.attendances[0];
                const endTimeSession = add(session.actualStartTime, {
                    hours: element.unit.studyHour,
                    minutes: element.unit.studyMinute,
                    seconds: element.unit.studySecond,
                });
                const studentAttendance: AttendanceOfStudent = {
                    attendanceDate: format(session.attendedTime, "yyyy-MM-dd"),
                    startTime: format(session.actualStartTime, "h:mm a"),
                    endTime: format(endTimeSession, "h:mm a"),
                    attendanceTime: format(session.attendedTime, "h:mm a"),
                    status: attendance.status!, //TODO: FIX API STATUS NOT NULL
                };
                if (studentAttendance.status === AttendanceStatus.PRESENT)
                    numberStudentsPresent++;
                else if (studentAttendance.status === AttendanceStatus.ABSENT)
                    numberStudentsAbsent++;
                else if (studentAttendance.status === AttendanceStatus.LATE)
                    numberStudentsLate++;

                if (
                    Object.keys(numberSessionsGroupByMonth).includes(
                        format(session.actualStartTime, "MM/yyyy")
                    )
                ) {
                    numberSessionsGroupByMonth[
                        format(session.actualStartTime, "MM/yyyy")
                    ]++;
                } else
                    numberSessionsGroupByMonth[
                        format(session.actualStartTime, "MM/yyyy")
                    ] = 1; //TODO: FIX API STATUS NOT NULL

                studentAttendances.push(studentAttendance);
            }
        });

        const studentTuitions: TuitionOfStudent[] = [];
        element.tuitions.forEach((tuition) => {
            const time =
                (Number(tuition.month + 1) < 10 ? "0" : "") +
                (tuition.month + 1) +
                "/" +
                tuition.year;
            const studentTuition: TuitionOfStudent = {
                time: time,
                numberOfSession: numberSessionsGroupByMonth[time].toString(),
                amount: tuition.amount.toString(),
                discount: tuition.discount.toString(),
                status: PaymentStatus.PAID,
            };
            studentTuitions.push(studentTuition);
            delete numberSessionsGroupByMonth[time];
        });

        Object.keys(numberSessionsGroupByMonth).forEach((key) => {
            const studentTuition: TuitionOfStudent = {
                time: key,
                numberOfSession: numberSessionsGroupByMonth[key].toString(),
                amount:
                    Math.round(
                        numberSessionsGroupByMonth[key] *
                            Number(element.unit.pricePerSession) *
                            100
                    ) /
                        100 +
                    "",
                discount: currentDiscount + "",
                status: PaymentStatus.DEBT,
            };
            studentTuitions.push(studentTuition);
        });

        const currentClassData: ClasslistColumns = {
            classId: element.id,
            className: element.unit.grade + "." + element.index,
            startDate: format(element.startTime, "yyyy-MM-dd"),
            endDate: format(element.endTime, "yyyy-MM-dd"),
            year: element.unit.year.toString(),
            participate: format(element.approvedAt as Date, "yyyy-MM-dd"),
            status: element.leftAt
                ? CurrentClassStatus.LEFT
                : CurrentClassStatus.LEARNING,
            attendanceTable: {
                numberStudentsAbsent: numberStudentsAbsent + "",
                numberStudentsLate: numberStudentsLate + "",
                numberStudentsPresent: numberStudentsPresent + "",
                attendances: studentAttendances,
            },
            tuitions: studentTuitions,
        };
        currentClassesData.push(currentClassData);
    });

    return currentClassesData;
};

function createColumns(
    key: string,
    title: string
): ColumnDef<ClasslistColumns> {
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
): ColumnDef<ClasslistColumns>[] => {
    const classListTableColumns: ColumnDef<ClasslistColumns>[] = [];
    for (const key in classListColumnsDictionary) {
        if (key !== "actions") {
            classListTableColumns.push(
                createColumns(key, classListColumnsDictionary[key])
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
                            <AttendancePopup
                                attendanceTable={row.original.attendanceTable}
                            />
                            <TuitionPopup
                                tuitionOfStudents={row.original.tuitions}
                            />
                            <Link
                                href={
                                    currentUrl == ""
                                        ? currentUrl +
                                          "/classes/" +
                                          row.original.classId
                                        : "/"
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

const StudentClassListTab = ({
    discount,
    studentClassesData,
}: {
    studentClassesData: StudentClassesData[];
    discount: number;
}): ReactElement => {
    const {user} = useUser();
    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;
    const [currentUrl, setCurrentUrl] = useState("");
    useEffect(() => {
        if (!user) return;
        setCurrentUrl(`${protocol}://${domain}/admins/${user!.id}`);
    }, [protocol, domain, user]);

    const [data] = useState<ClasslistColumns[]>(
        formatData(studentClassesData, discount)
    );

    const columns: ColumnDef<ClasslistColumns>[] =
        createTableColumns(currentUrl);
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
        <TabsContent value="classList">
            <ClassListTableFilter table={table} />
            <ClassListTableContent table={table} columns={columns} />
            <ClassListTablePagination table={table} />
        </TabsContent>
    );
};

export default StudentClassListTab;
