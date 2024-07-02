"Use client";

import React from "react";
import {SalaryDetailTableData, SalaryDetailColumnsDictionary} from "./types";
import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {ArrowUpDown} from "lucide-react";

function createColumns(
    key: string,
    title: string
): ColumnDef<SalaryDetailTableData> {
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

const SalaryDetailTableColumns = ({
    handleSelectAllBefore,
}: {
    handleSelectAllBefore: (isChecked: boolean, lastIndex: number) => void;
}): ColumnDef<SalaryDetailTableData>[] => {
    const columns: ColumnDef<SalaryDetailTableData>[] = [];
    columns.push({
        id: "select",
        cell: ({row}) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) =>
                    handleSelectAllBefore(!!value, row.index)
                }
            />
        ),
        enableSorting: false,
        enableHiding: false,
    });
    for (const key in SalaryDetailColumnsDictionary) {
        columns.push(createColumns(key, SalaryDetailColumnsDictionary[key]));
    }

    return columns;
};

export default SalaryDetailTableColumns;
