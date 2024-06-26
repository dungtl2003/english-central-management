export interface ClassInfo {
    classId: string; //uuid
    className: string; // 3.1, 3.2
    teacher: string; // Nguyễn Minh Đức
    year: string; // Khối 3
    start: string; // 01/05/2024
    end: string; // 31/12/2024
    price: string; // 150,000 / buổi
}

export interface ClassInfoDef {
    key: string;
    title: string;
}

export const ClassInfoArray: ClassInfoDef[] = [
    {key: "classId", title: "ID"},
    {key: "className", title: "Class name"},
    {key: "year", title: "Year"},
    {key: "start", title: "Start"},
    {key: "end", title: "End"},
    {key: "price", title: "Price/session"},
    {key: "teacher", title: "Teacher"},
];

export const ClassInfoDictionary: TableDictionary = {
    className: "Class name",
    year: "Year",
    start: "Start",
    end: "End",
    price: "Price/session",
    teacher: "Teacher",
};

export type TableDictionary = {
    [key: string]: string;
};
