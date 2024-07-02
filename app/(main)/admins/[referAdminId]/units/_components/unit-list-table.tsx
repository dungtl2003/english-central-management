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
import UnitListFilter from "./unit-list-filter";
import UnitListPagination from "./unit-list-pagination";
import UnitListContent from "./unit-list-content";
import {UnitListModel, unitListInfoDictionary} from "./types";
import {ArrowUpDown} from "lucide-react";
import {Button} from "@/components/ui/button";
import {FaArrowUpRightFromSquare} from "react-icons/fa6";
import Link from "next/link";
import {useUser} from "@clerk/nextjs";
import {UseActionOptions, useAction} from "@/hooks/use-action";
import {handler} from "@/lib/action/admin/get-units";
import {InputType, OutputType} from "@/lib/action/admin/get-units/types";
import {toast} from "@/components/ui/use-toast";
import {format} from "date-fns";
import {
    SkeletonUnitListContent,
    SkeletonUnitListFilter,
    SkeletonUnitListPagination,
} from "./skeleton";

function createColumns(key: string, title: string): ColumnDef<UnitListModel> {
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

const createTableColumns = (currentUrl: string): ColumnDef<UnitListModel>[] => {
    const unitListColumns: ColumnDef<UnitListModel>[] = [];
    for (const key in unitListInfoDictionary) {
        unitListColumns.push(createColumns(key, unitListInfoDictionary[key]));
    }

    unitListColumns.push({
        id: "actions",
        enableHiding: false,
        cell: ({row}) => (
            <Link href={currentUrl + "/" + row.original.unitId}>
                <Button variant="outline">
                    Detail
                    <span className="pl-2">
                        <FaArrowUpRightFromSquare size={13} />
                    </span>
                </Button>
            </Link>
        ),
    });

    return unitListColumns;
};

const formatData = (data: OutputType): UnitListModel[] => {
    const units: UnitListModel[] = [];

    data.forEach((element) => {
        const unit: UnitListModel = {
            unitId: element.id,
            year: element.year.toString(),
            grade: element.grade.toString(),
            maxSessions: element.maxSessions.toString(),
            maxStudents: element.maxStudents.toString(),
            studyTime: {
                studyHour: element.studyHour.toString(),
                studyMinute: element.studyMinute.toString(),
                studySecond: element.studySecond.toString(),
            },
            pricePerSession: element.pricePerSession.toString(),
            createdTime: format(element.createdAt, "yyyy-MM-dd"),
            classes: element.classes
                .filter((value) => !value.closedAt)
                .length.toString(),
        };
        units.push(unit);
    });

    return units;
};

const UnitListTable = (): ReactElement => {
    const {user} = useUser();
    const currentUrl = `/admins/${user?.id}/units`;

    const columns: ColumnDef<UnitListModel>[] = createTableColumns(currentUrl);

    const [units, setUnits] = useState<UnitListModel[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const fetchData = useCallback(handler, []);
    const event: UseActionOptions<OutputType> = useMemo(() => {
        return {
            onError: (error: string) => {
                console.error("Error: ", error);
                toast({
                    title: "error",
                    variant: "destructive",
                    description: "Get units failed",
                });
            },
            onSuccess: (data: OutputType) => {
                toast({
                    title: "Success",
                    variant: "success",
                    description: "Get units succeed",
                });
                setUnits(formatData(data));
                setIsLoading(false);
            },
        };
    }, []);
    const {execute} = useAction<InputType, OutputType>(fetchData, event);
    useEffect(() => {
        execute();
    }, [execute]);

    const [sorting, setSorting] = React.useState<SortingState>([]);

    const [pagination, setPagination] = React.useState<PaginationState>({
        pageIndex: 0,
        pageSize: 5,
    });

    const table = useReactTable({
        data: units,
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
            {isLoading && <SkeletonUnitListFilter />}
            {!isLoading && <UnitListFilter table={table} />}
            {isLoading && <SkeletonUnitListContent />}
            {!isLoading && <UnitListContent table={table} columns={columns} />}
            {isLoading && <SkeletonUnitListPagination />}
            {!isLoading && <UnitListPagination table={table} />}
        </div>
    );
};

export default UnitListTable;
