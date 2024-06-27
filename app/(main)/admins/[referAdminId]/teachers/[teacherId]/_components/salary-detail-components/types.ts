export type SalaryDetailColumns = {
    time: string;
    attendance: string;
    amount: string;
    status: string;
};

export type ColumnsModel = {
    key: string;
    title: string;
};

export const SalaryDetailColumnsArray: ColumnsModel[] = [
    {key: "time", title: "Time"},
    {key: "attendance", title: "Attendance"},
    {key: "amount", title: "Amount"},
    {key: "status", title: "Status"},
];

export const SalaryDetailColumnsDictionary: ColumnsDictionary = {
    time: "Time",
    attendance: "Attendance",
    amount: "Amount",
    status: "Status",
};

export type ColumnsDictionary = {
    [key: string]: string;
};
