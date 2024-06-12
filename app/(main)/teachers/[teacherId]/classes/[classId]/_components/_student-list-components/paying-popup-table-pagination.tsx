import {Table} from "@tanstack/react-table";
import {PayingPopupData} from "./types";
import {ReactElement} from "react";
import {Button} from "@/components/ui/button";

const PayingPopupTablePagination: React.FC<{table: Table<PayingPopupData>}> = ({
    table,
}): ReactElement => {
    return (
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
    );
};

export default PayingPopupTablePagination;
