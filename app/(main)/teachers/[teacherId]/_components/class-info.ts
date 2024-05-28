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

export type StudentInfo = {
    fullName: string;
    studentCode: string;
    birthday: string;
    tuitionPaid: string;
};

export type StudentInfoDef = {
    key: string;
    title: string;
};

export const StudentInfoArray: StudentInfoDef[] = [
    {key: "fullName", title: "Full name"},
    {key: "studentCode", title: "Student code"},
    {key: "birthday", title: "Birthday"},
    {key: "tuitionPaid", title: "Tuition fee"},
];

export const StudentInfoDictionary: TableDictionary = {
    fullName: "Full name",
    studentCode: "Student code",
    birthday: "Birthday",
    tuitionPaid: "Tuition fee",
};
