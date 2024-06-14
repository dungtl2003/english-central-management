import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
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
                value={`$${Math.round(totalAmountWithDiscount * 100) / 100}`}
                readOnly
            />
        </div>
    );
};

export default PayingPopupTotalAmountDiscount;
