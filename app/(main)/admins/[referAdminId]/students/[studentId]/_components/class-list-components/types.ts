export type ColumnsModel = {
    key: string;
    title: string;
};

export type ColumnsDictionary = {
    [key: string]: string;
};

export type ClasslistColumns = {
    classId: string;
    className: string;
    year: string;
    startDate: string;
    endDate: string;
    participate: string;
    status: string;

    attendanceTable: {
        numberStudentsPresent: string;
        numberStudentsLate: string;
        numberStudentsAbsent: string;
    } & {
        attendances: AttendanceOfStudent[];
    };

    tuitions: TuitionOfStudent[];
};

export type AttendanceOfStudent = {
    attendanceDate: string;
    startTime: string;
    endTime: string;
    attendanceTime: string;
    status: string;
};

export type TuitionOfStudent = {
    time: string;
    numberOfSession: string;
    amount: string;
    discount: string;
    status: string;
};

export enum PaymentStatus {
    PAID = "Paid",
    DEBT = "Debt",
}

export const classListColumnsArray: ColumnsModel[] = [
    {key: "className", title: "Class"},
    {key: "year", title: "Year"},
    {key: "startDate", title: "Start"},
    {key: "endDate", title: "End"},
    {key: "participate", title: "Participate"},
    {key: "status", title: "Status"},
];

export const classListColumnsDictionary: ColumnsDictionary = {
    className: "Class",
    year: "Year",
    participate: "Participate",
    startDate: "Start",
    endDate: "End",
    status: "Status",
    actions: "Actions",
};

export enum CurrentClassStatus {
    LEARNING = "Learning",
    LEFT = "LEFT",
}
