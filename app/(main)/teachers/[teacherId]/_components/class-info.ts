export type ClassInfo = {
    className: string;
    teacher: string;
    year: string;
    start: string;
    end: string;
    price: string;
};

export type ClassInfoDef = {
    key: string;
    title: string;
};

export const ClassInfoArray: ClassInfoDef[] = [
    {key: "className", title: "Class name"},
    {key: "year", title: "Year"},
    {key: "start", title: "Start"},
    {key: "end", title: "End"},
    {key: "price", title: "Price"},
    {key: "teacher", title: "Teacher"},
];

export const ClassInfoDictionary: TableDictionary = {
    className: "Class name",
    year: "Year",
    start: "Start",
    end: "End",
    price: "Price",
    teacher: "Teacher",
};

export type TableDictionary = {
    [key: string]: string;
};
