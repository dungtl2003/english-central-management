import React, {ReactElement} from "react";
import {TableHead, TableHeader, TableRow} from "@/components/ui/table";

const AttendanceTableHeader = (): ReactElement => {
    return (
        <TableHeader>
            <TableRow>
                <TableHead className="max-w-[50px]"></TableHead>
                <TableHead className="w-[250px]">Full name</TableHead>
                <TableHead className="">Student code</TableHead>
                <TableHead className="w-[200px]">Attendance</TableHead>
                <TableHead className="">Note</TableHead>
            </TableRow>
        </TableHeader>
    );
};

export default AttendanceTableHeader;
