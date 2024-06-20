export type SalaryDetailTableData = {
    monthlyPaymentId?: string;
    amount: string;
    month: string;
    year: string;
    paidAt: string | undefined;
    time: string;
    status: SalaryDetailStatus;
};

export type SalaryDetailColumns = {
    monthlyPaymentId: string;
    amount: string; // = salary
    time: string; // = MMM,yyyy
    status: SalaryDetailStatus;
};

export const SalaryDetailColumnsDictionary: ColumnsDictionary = {
    amount: "Amount", // = salary
    time: "Time", // = MMM,yyyy
    status: "Status",
};

export type ColumnsDictionary = {
    [key: string]: string;
};

export enum SalaryDetailStatus {
    PAID = "PAID",
    DEBT = "DEBT",
}

// export type ColumnsModel = {
//     key: string;
//     title: string;
// };

// export const SalaryDetailColumnsArray: ColumnsModel[] = [
//     {key: "salary", title: "Salary"},
//     {key: "month", title: "Month"},
//     {key: "year", title: "Year"},
//     {key: "paidAt", title: "Paid at"},
// ];
