import React, {ReactElement} from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {ChevronDown} from "lucide-react";
import {RadioGroup} from "@/components/ui/radio-group";
import {RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@radix-ui/react-label";
import {classListInfoDictionary} from "./types";

interface TableFilterOptionsProps {
    tableColumns: string[];
    selectedOptions: string;
    searchBarRef: React.RefObject<HTMLInputElement>;
    handleOnSelect: (
        filterValue: string,
        filterTitle: string,
        searchBarRef: React.RefObject<HTMLInputElement>
    ) => void;
}

const ClassListColumnsFilter = ({
    handleOnSelect,
    searchBarRef,
    selectedOptions,
    tableColumns,
}: TableFilterOptionsProps): ReactElement => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="">
                    Filters <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <RadioGroup defaultValue="">
                    {tableColumns.map((obj) => {
                        return (
                            <div
                                key={obj}
                                className="flex items-center space-x-2"
                            >
                                <RadioGroupItem
                                    value={obj}
                                    id={obj}
                                    checked={selectedOptions === obj}
                                    onClick={() =>
                                        handleOnSelect(obj, obj, searchBarRef)
                                    }
                                />
                                <Label htmlFor={obj}>
                                    {classListInfoDictionary[obj]}
                                </Label>
                            </div>
                        );
                    })}
                </RadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ClassListColumnsFilter;
