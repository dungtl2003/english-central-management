export type ClasslistColumns = {
    className: string;
    year: string;
    start: string;
    end: string;
    price: string;
};

export type ColumnsModel = {
    key: string;
    title: string;
};

export const ClassListColumnsArray: ColumnsModel[] = [
    {key: "className", title: "Class name"},
    {key: "year", title: "Year"},
    {key: "start", title: "Start"},
    {key: "end", title: "End"},
    {key: "price", title: "Price"},
];

export const ClassListColumnsDictionary: ColumnsDictionary = {
    className: "Class name",
    year: "Year",
    start: "Start",
    end: "End",
    price: "Price",
};

export type ColumnsDictionary = {
    [key: string]: string;
};
