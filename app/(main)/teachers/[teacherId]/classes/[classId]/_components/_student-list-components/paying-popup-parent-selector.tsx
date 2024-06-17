import {Label} from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {ReactElement} from "react";
import {StudentInfoData} from "./types";

const PayingPopupParentSelector: React.FC<{
    data: StudentInfoData;
    onParentSelect: (parentId: string) => void;
}> = ({data, onParentSelect}): ReactElement => {
    return (
        <div className="mb-3.5">
            <Label className="pl-1 text-left">Parent</Label>
            <Select onValueChange={onParentSelect}>
                <SelectTrigger>
                    <SelectValue placeholder="Choose your parent" />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        {data.parents?.map((parent) => (
                            <SelectItem key={parent.id} value={parent.id}>
                                {parent.fullName}
                            </SelectItem>
                        ))}
                    </SelectGroup>
                </SelectContent>
            </Select>
        </div>
    );
};

export default PayingPopupParentSelector;
