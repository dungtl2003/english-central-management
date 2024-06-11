import {AttendanceStatus} from "@prisma/client";

export type TableDictionary = {
    [key: string]: string;
};

export type StudentInfo = {
    index?: string;
    fullName: string;
    email: string;
    birthday: string;
    tuitionPaid: string;
};

export type StudentInfoDef = {
    key: string;
    title: string;
};

export const StudentInfoArray: StudentInfoDef[] = [
    {key: "index", title: ""},
    {key: "fullName", title: "Full name"},
    {key: "email", title: "Email"},
    {key: "birthday", title: "Birthday"},
    {key: "tuitionPaid", title: "Tuition fee"},
];

export const StudentInfoDictionary: TableDictionary = {
    index: "",
    fullName: "Full name",
    email: "Email",
    birthday: "Birthday",
    tuitionPaid: "Tuition fee",
};

export type SessionTableModel = {
    className: string;
    sessionId: string;
    estimatedStartTime: Date;
    actualStartTime: Date | null;
    attendedTime: Date | null;
    attendanceDate: string;
    startTime: string;
    endTime: string;
    presences: string;
    status: boolean;
    students: StudentAttendModel[];
    studyHour: number;
    studyMinute: number;
    attendances: AttendanceModel[];
};

export type AttendanceModel = {
    attendanceId: string;
    fullName: string;
    email: string;
    attendanceStatus: AttendanceStatus | null;
    note: string;
};

type StudentAttendModel = {
    fullName: string;
    email: string;
    status: AttendanceStatus;
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

export const SessionTableDictionary: TableDictionary = {
    attendanceDate: "Attendance date",
    startTime: "Start time",
    endTime: "End time",
    presences: "Presences",
    status: "Status",
};
