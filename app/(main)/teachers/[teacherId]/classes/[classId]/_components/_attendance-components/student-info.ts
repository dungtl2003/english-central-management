export type TableDictionary = {
    [key: string]: string;
};

export type StudentInfo = {
    index?: string;
    fullName: string;
    email: string;
    birthday: string;
    tuitionPaid: string;
};

export type StudentInfoDef = {
    key: string;
    title: string;
};

export const StudentInfoArray: StudentInfoDef[] = [
    {key: "index", title: ""},
    {key: "fullName", title: "Full name"},
    {key: "email", title: "Email"},
    {key: "birthday", title: "Birthday"},
    {key: "tuitionPaid", title: "Tuition fee"},
];

export const StudentInfoDictionary: TableDictionary = {
    index: "",
    fullName: "Full name",
    email: "Email",
    birthday: "Birthday",
    tuitionPaid: "Tuition fee",
};
