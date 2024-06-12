import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {ReactElement} from "react";

const PayingPopupDiscount: React.FC<{
    discount: string;
}> = ({discount}): ReactElement => {
    return (
        <div>
            <Label htmlFor="discount" className="pl-1 text-left">
                Discount <span className="text-slate-400">(%)</span>
            </Label>
            <Input
                id="discount"
                type="text"
                className="mt-1"
                value={`${discount}%`}
                readOnly
            />
        </div>
    );
};

export default PayingPopupDiscount;
