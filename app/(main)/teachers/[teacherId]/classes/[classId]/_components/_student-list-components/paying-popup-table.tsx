import {Table} from "@tanstack/react-table";
import {PayingPopupData} from "./types";
import {ReactElement} from "react";
import {Table as T} from "@/components/ui/table";
import PayingPopupTableFooter from "./paying-popup-table-footer";
import PayingPopupBody from "./paying-popup-table-body";
import PayingPopupHeader from "./paying-popup-table-header";

const PayingPopupTable: React.FC<{table: Table<PayingPopupData>}> = ({
    table,
}): ReactElement => {
    return (
        <div className="min-h-[300px]">
            <div className="rounded-md border">
                <T>
                    <PayingPopupHeader table={table} />
                    <PayingPopupBody table={table} />
                </T>
            </div>
            <PayingPopupTableFooter table={table} />
        </div>
    );
};

export default PayingPopupTable;
