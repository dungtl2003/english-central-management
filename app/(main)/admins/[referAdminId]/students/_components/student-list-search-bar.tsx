import {Input} from "@/components/ui/input";
import React, {ReactElement} from "react";
import {StudentListModel, StudentListDictionary} from "./types";
import {Table} from "@tanstack/react-table";

const StudentListSearchBar = ({
    classInfoDictionary,
    filterType,
    searchBar,
    table,
}: {
    classInfoDictionary: StudentListDictionary;
    searchBar: React.RefObject<HTMLInputElement>;
    table: Table<StudentListModel>;
    filterType: string;
}): ReactElement => {
    return (
        <Input
            placeholder={`Filter by ${classInfoDictionary[
                "fullName"
            ].toLowerCase()}`}
            ref={searchBar}
            value={
                (table.getColumn(filterType)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
                table.getColumn(filterType)?.setFilterValue(event.target.value)
            }
            className="w-[346px]"
        />
    );
};

export default StudentListSearchBar;
