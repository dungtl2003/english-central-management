export type SessionTableModel = {
    className?: string;
    attendanceDate: string;
    startTime: string;
    endTime: string;
    presences: string;
    status: string;
};

export type SessionTableDef = {
    key: string;
    title: string;
};

export const SessisonTableArray: SessionTableDef[] = [
    {key: "attendanceDate", title: "Attendance date"},
    {key: "startTime", title: "Start time"},
    {key: "endTime", title: "End time"},
    {key: "presences", title: "Presences"},
    {key: "status", title: "Status"},
];

export type TableDictionary = {
    [key: string]: string;
};

export const SessionTableDictionary: TableDictionary = {
    attendanceDate: "Attendance date",
    startTime: "Start time",
    endTime: "End time",
    presences: "Presences",
    status: "Status",
};
