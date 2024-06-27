export type ColumnsModel = {
    key: string;
    title: string;
};

export type ColumnsDictionary = {
    [key: string]: string;
};

export type ClasslistColumns = {
    className: string;
    year: string;
    start: string;
    end: string;
};

export const classListColumnsArray: ColumnsModel[] = [
    {key: "className", title: "Class"},
    {key: "year", title: "Year"},
    {key: "start", title: "Start"},
    {key: "end", title: "End"},
];

export const classListColumnsDictionary: ColumnsDictionary = {
    className: "Class",
    year: "Year",
    start: "Start",
    end: "End",
    actions: "Actions",
};
