import {Table, TableBody, TableCell, TableRow} from "@/components/ui/table";
import {Textarea} from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import React, {ReactElement} from "react";
import AttendanceTableHeader from "./attendance-detail-table-header";
import {StudentData} from "../../../../_components/dummy-data";

const AttendanceTable = (): ReactElement => {
    let order: number = 1;
    return (
        <div className="relative max-h-[400px] overflow-y-auto">
            <Table>
                <AttendanceTableHeader />
                <TableBody>
                    {StudentData.map((student) => {
                        return (
                            <TableRow key={order++}>
                                <TableCell>{order++}</TableCell>
                                <TableCell>{student.fullName}</TableCell>
                                <TableCell>{student.studentCode}</TableCell>
                                <TableCell>
                                    <Select defaultValue="PRESENT">
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="PRESENT">
                                                Present
                                            </SelectItem>
                                            <SelectItem value="ABSENT">
                                                Absent
                                            </SelectItem>
                                            <SelectItem value="LATE">
                                                Late
                                            </SelectItem>
                                        </SelectContent>
                                    </Select>
                                </TableCell>
                                <TableCell>
                                    <Textarea
                                        placeholder="Note here."
                                        className="resize-none"
                                        spellCheck={false}
                                    />
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

export default AttendanceTable;
