import {Table} from "@/components/ui/table";
import {Textarea} from "@/components/ui/textarea";
import React, {ReactElement, useCallback, useMemo, useState} from "react";
import {
    ColumnDef,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {
    attendanceTableDictionary,
    AttendanceTableModel,
    SessionTableModel,
} from "./types";
import AttendanceTableStatusSelector from "./attendance-table-status-selector";
import AttendanceTableHeader from "./attendance-table-header";
import AttendanceTableBody from "./attendance-table-body";
import AttendanceTableFooter from "./attendance-table-footer";
import {useToast} from "@/components/ui/use-toast";
import {handler} from "@/lib/action/teacher/update-attendances";
import {UseActionOptions, useAction} from "@/hooks/use-action";
import {OutputType} from "@/lib/action/teacher/update-attendances/types";
import {Attendance} from "@/app/api/attendances/schema";

export const createStatusSelectionColumn = (
    key: string
): ColumnDef<AttendanceTableModel> => {
    return {
        accessorKey: key,
        header: attendanceTableDictionary[key],
        cell: ({row}) => (
            <AttendanceTableStatusSelector
                initialValue={row.original}
                onChange={(value) => {
                    row.original.status = value;
                }}
            />
        ),
    } as ColumnDef<AttendanceTableModel>;
};

export const createDescriptionNoteColumn = (
    key: string
): ColumnDef<AttendanceTableModel> => {
    return {
        accessorKey: key,
        header: attendanceTableDictionary[key],
        cell: ({row}) => (
            <Textarea
                value={row.original.description || undefined}
                placeholder="Note here."
                className="resize-none"
                spellCheck={false}
                onChange={(event) => {
                    row.original.description = event.target.value;
                }}
            />
        ),
    } as ColumnDef<AttendanceTableModel>;
};

export const createNormalColumn = (
    key: string
): ColumnDef<AttendanceTableModel> => {
    return {
        accessorKey: key,
        header: () => (
            <Button variant="ghost">{attendanceTableDictionary[key]}</Button>
        ),
    } as ColumnDef<AttendanceTableModel>;
};

const formatData = (data: SessionTableModel): AttendanceTableModel[] => {
    const formattedData: AttendanceTableModel[] = [];

    if (!data) return formattedData;

    data.attendances.forEach((attendance) => {
        formattedData.push({
            attendanceId: attendance.attendanceId,
            fullName: attendance.fullName,
            email: attendance.email,
            status: attendance.status || undefined,
            description: attendance.description,
        } as AttendanceTableModel);
    });

    return formattedData;
};

const AttendanceTable2: React.FC<{
    data: SessionTableModel;
    canSaveAttendances: boolean;
}> = ({data, canSaveAttendances}): ReactElement => {
    const {toast} = useToast();
    const memoHandler = useCallback(handler, []);
    const memoEvent = useMemo(() => {
        return {
            onSuccess: () => {
                toast({
                    title: "Success",
                    variant: "success",
                    description: "Updated attendances",
                });

                window.location.reload();
            },
            onError: (error) => {
                toast({
                    title: "Error updating attendances",
                    variant: "destructive",
                    description: error,
                });
            },
        } as UseActionOptions<OutputType>;
    }, [toast]);
    const {execute, isLoading} = useAction(memoHandler, memoEvent);

    const columns: ColumnDef<AttendanceTableModel>[] = [];
    for (const key in attendanceTableDictionary) {
        switch (key) {
            case "status":
                columns.push(createStatusSelectionColumn(key));
                break;
            case "description":
                columns.push(createDescriptionNoteColumn(key));
                break;
            default:
                columns.push(createNormalColumn(key));
        }
    }

    const [formattedData] = useState<AttendanceTableModel[]>(formatData(data));
    const table = useReactTable({
        data: formattedData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        state: {},
    });

    const onConfirmHandler = () => {
        const attendances: Attendance[] = [];
        const rows = table.getRowModel().rows;

        for (const row of rows) {
            const value: AttendanceTableModel = row.original;
            if (!value.status) {
                toast({
                    title: "Error updating attendances",
                    variant: "destructive",
                    description: "All students must have attendance's status",
                });

                return;
            }
            attendances.push({
                attendanceId: value.attendanceId,
                status: value.status,
                description: value.description,
            });
        }

        execute({
            sessionId: data.sessionId,
            attendances: attendances,
        });
    };

    return (
        <div className="relative max-h-[400px] overflow-y-auto">
            <Table>
                <AttendanceTableHeader table={table} />
                <AttendanceTableBody table={table} columns={columns} />
                <AttendanceTableFooter
                    onConfirmHandler={onConfirmHandler}
                    canSaveAttendances={canSaveAttendances}
                    isLoading={isLoading}
                />
            </Table>
        </div>
    );
};

export default AttendanceTable2;
