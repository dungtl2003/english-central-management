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
    attendanceDate: Date;
    formattedAttendanceDate: string;
    startTime: string;
    endTime: string;
    presences: string;
    status: boolean;
    students: StudentAttendModel[];
    studyHour: number;
    studyMinute: number;
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
    {key: "formattedAttendanceDate", title: "Attendance date"},
    {key: "startTime", title: "Start time"},
    {key: "endTime", title: "End time"},
    {key: "presences", title: "Presences"},
    {key: "status", title: "Status"},
];

export const SessionTableDictionary: TableDictionary = {
    formattedAttendanceDate: "Attendance date",
    startTime: "Start time",
    endTime: "End time",
    presences: "Presences",
    status: "Status",
};
