export type TableDictionary = {
    [key: string]: string;
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
