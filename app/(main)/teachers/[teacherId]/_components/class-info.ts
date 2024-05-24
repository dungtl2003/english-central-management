export type ClassInfo = {
    className: string; // 3.1, 3.2
    teacher: string; // Nguyễn Minh Đức
    year: string; // Khối 3
    start: string; // 01/05/2024
    end: string; // 31/12/2024
    price: string; // 150,000 / buổi
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

export type TableDictionary = {
    [key: string]: string;
};

export const ClassInfoDictionary: TableDictionary = {
    className: "Class name",
    year: "Year",
    start: "Start",
    end: "End",
    price: "Price",
    teacher: "Teacher",
};
