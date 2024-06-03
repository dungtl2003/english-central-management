import {
    Table,
    TableHead,
    TableHeader,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";
import {Textarea} from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import React, {ReactElement} from "react";
import {StudentDummyData} from "./student-dummy-data";

const AttendanceTable = (): ReactElement => {
    let order: number = 1;
    return (
        <div className="relative max-h-[400px] overflow-y-auto">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="max-w-[50px]"></TableHead>
                        <TableHead className="w-[250px]">Full name</TableHead>
                        <TableHead className="">Email</TableHead>
                        <TableHead className="w-[200px]">Attendance</TableHead>
                        <TableHead className="">Note</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {StudentDummyData.map((student) => {
                        return (
                            <TableRow key={order++}>
                                <TableCell>{order}</TableCell>
                                <TableCell className="text-left">
                                    {student.fullName}
                                </TableCell>
                                <TableCell>{student.email}</TableCell>
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
