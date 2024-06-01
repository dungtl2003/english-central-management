import React, {ReactElement} from "react";
import {Button} from "@/components/ui/button";
import {PayingPopupModel} from "./paying-popup-model";
import {Checkbox} from "@/components/ui/checkbox";
import {Table} from "@tanstack/react-table";

interface PayingPopupPaginationProps {
    table: Table<PayingPopupModel>;
}

const PayingPopupPagination = ({
    table,
}: PayingPopupPaginationProps): ReactElement => {
    const [showPaid, setShowPaid] = React.useState(false);
    const handleCheckboxChange = (isChecked: boolean) => {
        setShowPaid(isChecked);
        table.setColumnFilters((old) => [
            ...old.filter((filter) => filter.id !== "status"),
            ...(isChecked ? [] : [{id: "status", value: "Debt"}]),
        ]);
    };

    return (
        <div className="flex items-center justify-end space-x-2 py-4">
            <div className="flex-1 items-center space-x-2">
                <Checkbox
                    checked={showPaid}
                    onCheckedChange={handleCheckboxChange}
                    id="togglePaid"
                />
                <label
                    htmlFor="togglePaid"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                    Show paid
                </label>
            </div>
            <div className="space-x-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    );
};

export default PayingPopupPagination;
