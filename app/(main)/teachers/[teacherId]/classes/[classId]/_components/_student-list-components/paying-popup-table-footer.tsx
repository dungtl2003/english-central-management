import {Table} from "@tanstack/react-table";
import {PayingPopupData} from "./types";
import {ReactElement} from "react";
import PayingPopupTableFilter from "./paying-popup-filter";
import PayingPopupTablePagination from "./paying-popup-table-pagination";

const PayingPopupTableFooter: React.FC<{table: Table<PayingPopupData>}> = ({
    table,
}): ReactElement => {
    return (
        <div className="flex items-center justify-end space-x-2 py-4">
            <PayingPopupTableFilter table={table} />
            <PayingPopupTablePagination table={table} />
        </div>
    );
};

export default PayingPopupTableFooter;
