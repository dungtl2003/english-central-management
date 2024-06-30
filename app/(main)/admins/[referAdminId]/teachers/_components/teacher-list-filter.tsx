import React, {ReactElement} from "react";
import {Table} from "@tanstack/react-table";
import {
    TeacherListModel,
    TeacherListInfoArray,
    TeacherListInfoDictionary,
} from "./types";
import TeacherListSearchBar from "./teacher-list-search-bar";
import TeacherListColumnsFilter from "./teacher-list-columns-filter";
import TeacherListRowsFilter from "./teacher-list-rows-filter";
import {
    DropdownMenu,
    DropdownMenuItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {ChevronDown} from "lucide-react";

interface TableFilterProps {
    table: Table<TeacherListModel>;
    selectedStatus: string[];
    handleStatusChange: (status: string) => void;
}

const TeacherListFilter = ({
    table,
    selectedStatus,
    handleStatusChange,
}: TableFilterProps): ReactElement => {
    const [filterType, _setFilterType] = React.useState("fullName");
    const [selectedRadio, _setSelectedRadio] = React.useState("fullName");
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
        <div className="flex items-center py-4">
            <div className="flex flex-row w-full gap-x-4">
                <TeacherListSearchBar
                    classInfoDictionary={TeacherListInfoDictionary}
                    searchBar={searchBar}
                    table={table}
                    filterType={filterType}
                />
                <TeacherListColumnsFilter
                    tableColumns={TeacherListInfoArray}
                    selectedOptions={selectedRadio}
                    searchBarRef={searchBar}
                    handleOnSelect={handleRadioClick}
                />
                <TeacherListRowsFilter
                    selectedStatus={selectedStatus}
                    handleStatusChange={handleStatusChange}
                />
                <div className="flex gap-x-4 ml-auto">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline">
                                Total: <span className="pl-1.5">50</span>{" "}
                                <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="">
                            <DropdownMenuItem className="flex justify-center items-center">
                                Teaching:{" "}
                                <span className="pl-1.5 text-green-400">
                                    23
                                </span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex justify-center items-center">
                                Pending:{" "}
                                <span className="pl-1.5 text-yellow-400">
                                    15
                                </span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="flex justify-center items-center">
                                Retired:{" "}
                                <span className="pl-1.5 text-red-600">12</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    );
};

export default TeacherListFilter;
