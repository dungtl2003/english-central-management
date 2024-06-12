import {Checkbox} from "@/components/ui/checkbox";
import {Table} from "@tanstack/react-table";
import {ReactElement, useState} from "react";
import {PayingPopupData, PayingPopupStatus} from "./types";

const PayingPopupTableFilter: React.FC<{table: Table<PayingPopupData>}> = ({
    table,
}): ReactElement => {
    const [showPaid, setShowPaid] = useState(false);
    const handleCheckboxChange = (isChecked: boolean) => {
        setShowPaid(isChecked);
        table.setColumnFilters((old) => [
            ...old.filter((filter) => filter.id !== "status"),
            ...(isChecked
                ? []
                : [{id: "status", value: PayingPopupStatus.DEBT}]),
        ]);
    };

    return (
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
    );
};

export default PayingPopupTableFilter;
