import {Input} from "@/components/ui/input";
import React, {ReactElement} from "react";
import {TeacherListModel, TeacherListDictionary} from "./teacher-list-model";
import {Table} from "@tanstack/react-table";

type TableSearchBarProps = {
    classInfoDictionary: TeacherListDictionary;
    searchBar: React.RefObject<HTMLInputElement>;
    table: Table<TeacherListModel>;
    filterType: string;
};

const TeacherListSearchBar = ({
    classInfoDictionary,
    filterType,
    searchBar,
    table,
}: TableSearchBarProps): ReactElement => {
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

export default TeacherListSearchBar;
