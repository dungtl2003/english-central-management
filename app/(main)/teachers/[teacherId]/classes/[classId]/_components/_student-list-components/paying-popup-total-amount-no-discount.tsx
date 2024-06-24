import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {roundUp} from "@/lib/utils";
import {ReactElement} from "react";

const PayingPopupTotalAmountNoDiscount: React.FC<{
    totalAmountNoDiscount: number;
}> = ({totalAmountNoDiscount}): ReactElement => {
    return (
        <div className="mb-3.5">
            <Label htmlFor="totalNoDiscount" className="pl-1 text-left">
                Total amount{" "}
                <span className="text-slate-400">(No discount)</span>
            </Label>
            <Input
                id="totalNoDiscount"
                type="text"
                className="mt-1"
                value={`$${roundUp(totalAmountNoDiscount, 2)}`}
                readOnly
            />
        </div>
    );
};

export default PayingPopupTotalAmountNoDiscount;
