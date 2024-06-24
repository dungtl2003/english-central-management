import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {roundUp} from "@/lib/utils";
import {ReactElement} from "react";

const PayingPopupTotalAmountDiscount: React.FC<{
    totalAmountWithDiscount: number;
}> = ({totalAmountWithDiscount}): ReactElement => {
    return (
        <div>
            <Label htmlFor="totalWithDiscount" className="pl-1 text-left">
                Total amount <span className="text-slate-400">(Discount)</span>
            </Label>
            <Input
                id="totalWithDiscount"
                type="text"
                className="mt-1"
                value={`$${roundUp(totalAmountWithDiscount, 2)}`}
                readOnly
            />
        </div>
    );
};

export default PayingPopupTotalAmountDiscount;
