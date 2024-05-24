import React, {ReactElement} from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {ChevronDown} from "lucide-react";
import {RadioGroup} from "@/components/ui/radio-group";
import {FilterOptions} from "./filter-options";
import {ClassInfoDef} from "./class-info";

type TableFilterOptionsProps = {
    tableColumns: ClassInfoDef[];
    selectedOptions: string;
    searchBarRef: React.RefObject<HTMLInputElement>;
    handleOnSelect: (
        filterValue: string,
        filterTitle: string,
        searchBarRef: React.RefObject<HTMLInputElement>
    ) => void;
};

const TableFilterOptions = (props: TableFilterOptionsProps): ReactElement => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" className="">
                    Filters <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <RadioGroup defaultValue="">
                    {props.tableColumns.map((obj) => (
                        <FilterOptions
                            key={obj.key}
                            filterValue={obj.key}
                            filterTitle={obj.title}
                            selectedOption={props.selectedOptions}
                            searchBarRef={props.searchBarRef}
                            handleOnSelect={props.handleOnSelect}
                        />
                    ))}
                </RadioGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default TableFilterOptions;
