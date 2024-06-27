import React, {ReactElement} from "react";
import {Table} from "@tanstack/react-table";
import {
    ClasslistColumns,
    classListColumnsArray,
    classListColumnsDictionary,
} from "./types";
import {Input} from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {ChevronDown} from "lucide-react";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@radix-ui/react-label";

type TableFilterProps = {
    table: Table<ClasslistColumns>;
};

const ClassListTableFilter = ({table}: TableFilterProps): ReactElement => {
    const [filterType, _setFilterType] = React.useState("className");
    const [selectedRadio, _setSelectedRadio] = React.useState("className");
    const searchBar = React.useRef<HTMLInputElement>(null);
    const handleRadioClick = (
        key: string,
        title: string,
        searchBar: React.RefObject<HTMLInputElement>
    ) => {
        searchBar.current?.setAttribute(
            "placeholder",
            `Filter by ${title.toLocaleLowerCase()}`
        );
        _setFilterType(key);
        _setSelectedRadio(key);
        table.setSorting([]);
        table.setColumnFilters([]);
        table.setRowSelection({});
    };

    return (
        <div className="flex items-center pb-4">
            <div className="flex flex-row gap-x-4">
                <Input
                    placeholder={`Filter by ${classListColumnsDictionary[
                        "className"
                    ].toLowerCase()}`}
                    ref={searchBar}
                    value={
                        (table
                            .getColumn(filterType)
                            ?.getFilterValue() as string) ?? ""
                    }
                    onChange={(event) =>
                        table
                            .getColumn(filterType)
                            ?.setFilterValue(event.target.value)
                    }
                    className="w-[250px]"
                />
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="">
                            Filters <ChevronDown className="ml-2 h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <RadioGroup defaultValue="">
                            {classListColumnsArray.map((obj) => (
                                <div
                                    key={obj.key}
                                    className="flex items-center space-x-2"
                                >
                                    <RadioGroupItem
                                        key={obj.key}
                                        value={obj.key}
                                        id={obj.key}
                                        checked={selectedRadio === obj.key}
                                        onClick={() =>
                                            handleRadioClick(
                                                obj.key,
                                                obj.title,
                                                searchBar
                                            )
                                        }
                                    />
                                    <Label htmlFor={obj.key}>{obj.title}</Label>
                                </div>
                            ))}
                        </RadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    );
};

export default ClassListTableFilter;
