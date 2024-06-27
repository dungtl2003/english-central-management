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
    monthlyPayment: string;
    discount: string;
    status: string;
};

export const tuitionPopupColumnsArray: ColumnsModel[] = [
    {key: "time", title: "Time"},
    {key: "numberOfSession", title: "Attendances"},
    {key: "monthlyPayment", title: "Payment (No discount)"},
    {key: "discount", title: "Discount (%)"},
    {key: "status", title: "Status"},
];

export const tuitionPopupColumnsDictionary: ColumnsDictionary = {
    time: "Time",
    numberOfSession: "Attendances",
    monthlyPayment: "Payment (No discount)",
    discount: "Discount (%)",
    status: "Status",
};
