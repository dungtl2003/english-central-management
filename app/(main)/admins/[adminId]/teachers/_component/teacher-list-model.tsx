export type TeacherListModel = {
    fullName: string;
    salary: string;
    startDate: string;
    status: string;
};

export type TeacherListInfo = {
    key: string;
    title: string;
};

export type TeacherListDictionary = {
    [key: string]: string;
};

export const TeacherListInfoArray: TeacherListInfo[] = [
    {key: "fullName", title: "Full name"},
    {key: "salary", title: "Salary"},
    {key: "startDate", title: "Start date"},
    {key: "status", title: "Status"},
];

export const TeacherListInfoDictionary: TeacherListDictionary = {
    fullName: "Full name",
    salary: "Salary",
    startDate: "Start date",
    status: "Status",
};
