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
import {UnitListInfo} from "./types";

interface TableFilterOptionsProps {
    tableColumns: UnitListInfo[];
    selectedOptions: string;
    searchBarRef: React.RefObject<HTMLInputElement>;
    handleOnSelect: (
        filterValue: string,
        filterTitle: string,
        searchBarRef: React.RefObject<HTMLInputElement>
    ) => void;
}

const UnitListColumnsFilter = ({
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
                                key={obj.key}
                                className="flex items-center space-x-2"
                            >
                                <RadioGroupItem
                                    value={obj.key}
                                    id={obj.key}
                                    checked={selectedOptions === obj.key}
                                    onClick={() =>
                                        handleOnSelect(
                                            obj.key,
                                            obj.key,
                                            searchBarRef
                                        )
                                    }
                                />
                                <Label htmlFor={obj.key}>{obj.title}</Label>
                            </div>
                        );
                    })}
                </RadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default UnitListColumnsFilter;
