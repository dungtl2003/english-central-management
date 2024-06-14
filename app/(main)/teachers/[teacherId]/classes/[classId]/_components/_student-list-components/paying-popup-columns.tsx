"Use client";

import React from "react";
import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";
import {PayingPopupDictionary, PayingPopupData} from "./types";

function createColumns(key: string, title: string): ColumnDef<PayingPopupData> {
    return {
        accessorKey: key,
        header: () => <Button variant="ghost">{title}</Button>,
    };
}

interface ColumnProps {
    handleSelectAllChange: (isChecked: boolean) => void;
}

const PayingPopupColumns = ({
    handleSelectAllChange,
}: ColumnProps): ColumnDef<PayingPopupData>[] => {
    const columns: ColumnDef<PayingPopupData>[] = [];
    columns.push({
        id: "select",
        header: ({table}) => {
            return (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={
                        // (value) =>
                        // table.toggleAllPageRowsSelected(!!value)
                        (value) => handleSelectAllChange(!!value)
                    }
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
    for (const key in PayingPopupDictionary) {
        if (key === "select") {
        }
        columns.push(createColumns(key, PayingPopupDictionary[key]));
    }

    return columns;
};

export default PayingPopupColumns;
