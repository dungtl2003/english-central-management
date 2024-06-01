"Use client";

import React from "react";
import {PayingPopupModel, PayingPopupDictionary} from "./paying-popup-model";
import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {Checkbox} from "@/components/ui/checkbox";

function createColumns(
    key: string,
    title: string
): ColumnDef<PayingPopupModel> {
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
}: ColumnProps): ColumnDef<PayingPopupModel>[] => {
    const columns: ColumnDef<PayingPopupModel>[] = [];
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
        columns.push(createColumns(key, PayingPopupDictionary[key]));
    }

    return columns;
};

export default PayingPopupColumns;
