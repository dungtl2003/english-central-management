export type ClasslistTableData = {
    classId: string;
    grade: string;
    index: string;
    startTime: string;
    endTime: string;
    year: string;
    price: string;
    className: string;
};

export type ClasslistColumns = {
    className: string;
    year: string;
    startTime: string;
    endTime: string;
    price: string;
};

export type ColumnsModel = {
    key: string;
    title: string;
};

export const classListColumnsArray: ColumnsModel[] = [
    {key: "className", title: "Class name"},
    {key: "year", title: "Year"},
    {key: "startTime", title: "Start"},
    {key: "endTime", title: "End"},
    {key: "price", title: "Price"},
];

export const classListColumnsDictionary: ColumnsDictionary = {
    className: "Class name",
    year: "Year",
    startTime: "Start",
    endTime: "End",
    price: "Price",
};

export type ColumnsDictionary = {
    [key: string]: string;
};
