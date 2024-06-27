import React, {ReactElement} from "react";
import {Table} from "@tanstack/react-table";
import {StudentInfo} from "./types";
import {Input} from "@/components/ui/input";

type TableFilterProps = {
    table: Table<StudentInfo>;
};

const ClassListTableFilter = (props: TableFilterProps): ReactElement => {
    const filterType: string = "fullName";
    const searchBar = React.useRef<HTMLInputElement>(null);
    return (
        <div className="flex flex-row gap-x-4">
            <Input
                placeholder={"Filter by full name"}
                ref={searchBar}
                value={
                    (props.table
                        .getColumn(filterType)
                        ?.getFilterValue() as string) ?? ""
                }
                onChange={(event) =>
                    props.table
                        .getColumn(filterType)
                        ?.setFilterValue(event.target.value)
                }
                className="w-[250px]"
            />
        </div>
    );
};

export default ClassListTableFilter;
