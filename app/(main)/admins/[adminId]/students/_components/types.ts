export type StudentListModel = {
    fullName: string;
    email: string;
    phoneNumber: string;
    birthday: string;
    status: string;
};

export type StudentListInfo = {
    key: string;
    title: string;
};

export type StudentListDictionary = {
    [key: string]: string;
};

export const StudentListInfoArray: StudentListInfo[] = [
    {key: "fullName", title: "Full name"},
    {key: "email", title: "Email"},
    {key: "phoneNumber", title: "Phone number"},
    {key: "birthday", title: "Birthday"},
    {key: "status", title: "Status"},
];

export const StudentListInfoDictionary: StudentListDictionary = {
    fullName: "Full name",
    email: "Email",
    phoneNumber: "Phone number",
    birthday: "Birthday",
    status: "Status",
};
