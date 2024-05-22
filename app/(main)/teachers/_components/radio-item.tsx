import {RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@radix-ui/react-label";

interface RadioItemProps {
    rkey: string;
    title: string;
    selectedRadio: string;
    searchBar: React.RefObject<HTMLInputElement>;
    handleRadioClick: (
        rkey: string,
        title: string,
        searchBar: React.RefObject<HTMLInputElement>
    ) => void;
}

export function CreateRadioItems({
    rkey,
    title,
    selectedRadio,
    searchBar,
    handleRadioClick,
}: RadioItemProps) {
    return (
        <>
            <div className="flex items-center space-x-2">
                <RadioGroupItem
                    value={rkey}
                    id={rkey}
                    checked={selectedRadio === rkey}
                    onClick={() => handleRadioClick(rkey, title, searchBar)}
                />
                <Label htmlFor={rkey}>{title}</Label>
            </div>
        </>
    );
}
