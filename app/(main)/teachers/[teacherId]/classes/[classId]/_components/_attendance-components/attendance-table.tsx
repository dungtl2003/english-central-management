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
import AttendanceTableHeader from "./attendance-table-header";

const AttendanceTable = (): ReactElement => {
    return (
        <div className="relative max-h-[400px] overflow-y-auto">
            <Table>
                <AttendanceTableHeader />
                <TableBody>
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Nguyễn Minh Đức</TableCell>
                        <TableCell>EN330</TableCell>
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
                                    <SelectItem value="LATE">Late</SelectItem>
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
                    <TableRow>
                        <TableCell>2</TableCell>
                        <TableCell>Trần Lưu Dũng</TableCell>
                        <TableCell>EN331</TableCell>
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
                                    <SelectItem value="LATE">Late</SelectItem>
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
                    <TableRow>
                        <TableCell>3</TableCell>
                        <TableCell>Nguyễn Hữu Nhật Quang</TableCell>
                        <TableCell>EN332</TableCell>
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
                                    <SelectItem value="LATE">Late</SelectItem>
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
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Nguyễn Minh Đức</TableCell>
                        <TableCell>EN330</TableCell>
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
                                    <SelectItem value="LATE">Late</SelectItem>
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
                    <TableRow>
                        <TableCell>2</TableCell>
                        <TableCell>Trần Lưu Dũng</TableCell>
                        <TableCell>EN331</TableCell>
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
                                    <SelectItem value="LATE">Late</SelectItem>
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
                    <TableRow>
                        <TableCell>3</TableCell>
                        <TableCell>Nguyễn Hữu Nhật Quang</TableCell>
                        <TableCell>EN332</TableCell>
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
                                    <SelectItem value="LATE">Late</SelectItem>
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
                    <TableRow>
                        <TableCell>1</TableCell>
                        <TableCell>Nguyễn Minh Đức</TableCell>
                        <TableCell>EN330</TableCell>
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
                                    <SelectItem value="LATE">Late</SelectItem>
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
                    <TableRow>
                        <TableCell>2</TableCell>
                        <TableCell>Trần Lưu Dũng</TableCell>
                        <TableCell>EN331</TableCell>
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
                                    <SelectItem value="LATE">Late</SelectItem>
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
                    <TableRow>
                        <TableCell>3</TableCell>
                        <TableCell>Nguyễn Hữu Nhật Quang</TableCell>
                        <TableCell>EN332</TableCell>
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
                                    <SelectItem value="LATE">Late</SelectItem>
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
                </TableBody>
            </Table>
        </div>
    );
};

export default AttendanceTable;
