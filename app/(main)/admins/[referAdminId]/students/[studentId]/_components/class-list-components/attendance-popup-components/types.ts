export type ColumnsModel = {
    key: string;
    title: string;
};

export type ColumnsDictionary = {
    [key: string]: string;
};

export type AttendancePopupColumns = {
    attendanceDate: string;
    startTime: string;
    endTime: string;
    attendanceTime: string;
    status: string;
};

export const attendancePopupColumnsArray: ColumnsModel[] = [
    {key: "attendanceDate", title: "Attendance date"},
    {key: "startTime", title: "Start time"},
    {key: "endTime", title: "End time"},
    {key: "attendanceTime", title: "Enter time"},
    {key: "status", title: "Status"},
];

export const attendancePopupColumnsDictionary: ColumnsDictionary = {
    attendanceDate: "Attendance date",
    startTime: "Start time",
    endTime: "End time",
    attendanceTime: "Enter time",
    status: "Status",
};
