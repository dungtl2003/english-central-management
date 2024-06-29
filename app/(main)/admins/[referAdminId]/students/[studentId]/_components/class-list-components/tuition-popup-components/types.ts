export type ColumnsModel = {
    key: string;
    title: string;
};

export type ColumnsDictionary = {
    [key: string]: string;
};

export type TuitionPopupColumns = {
    time: string;
    numberOfSession: string;
    amount: string;
    discount: string;
    status: string;
};

export const tuitionPopupColumnsArray: ColumnsModel[] = [
    {key: "time", title: "Time"},
    {key: "numberOfSession", title: "Attendances"},
    {key: "amount", title: "Payment (No discount)"},
    {key: "discount", title: "Discount (%)"},
    {key: "status", title: "Status"},
];

export const tuitionPopupColumnsDictionary: ColumnsDictionary = {
    time: "Time",
    numberOfSession: "Attendances",
    amount: "Payment (No discount)",
    discount: "Discount (%)",
    status: "Status",
};
