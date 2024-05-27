import {RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@radix-ui/react-label";
import {ReactElement} from "react";

interface RadioItemProps {
    filterValue: string;
    filterTitle: string;
    selectedOption: string;
    searchBarRef: React.RefObject<HTMLInputElement>;
    handleOnSelect: (
        filterValue: string,
        filterTitle: string,
        searchBarRef: React.RefObject<HTMLInputElement>
    ) => void;
}

export function FilterOptions(props: RadioItemProps): ReactElement {
    return (
        <>
            <div className="flex items-center space-x-2">
                <RadioGroupItem
                    value={props.filterValue}
                    id={props.filterValue}
                    checked={props.selectedOption === props.filterValue}
                    onClick={() =>
                        props.handleOnSelect(
                            props.filterValue,
                            props.filterTitle,
                            props.searchBarRef
                        )
                    }
                />
                <Label htmlFor={props.filterValue}>{props.filterTitle}</Label>
            </div>
        </>
    );
}
