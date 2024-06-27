"Use client";

import React from "react";
import {SalaryDetailColumns, SalaryDetailColumnsDictionary} from "./types";
import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";

function createColumns(
    key: string,
    title: string
): ColumnDef<SalaryDetailColumns> {
    return {
        accessorKey: key,
        header: () => <Button variant="ghost">{title}</Button>,
    };
}

interface SalaryDetailTableColumnsProps {
    handleSelectAllChange: (isChecked: boolean) => void;
}

const SalaryDetailTableColumns = ({
    handleSelectAllChange,
}: SalaryDetailTableColumnsProps): ColumnDef<SalaryDetailColumns>[] => {
    const columns: ColumnDef<SalaryDetailColumns>[] = [];
    columns.push({
        id: "select",
        header: ({table}) => {
            return (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => handleSelectAllChange(!!value)}
                />
            );
        },
        cell: ({row}) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
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
