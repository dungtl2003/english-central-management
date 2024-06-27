export type StudentListModel = {
    studentId: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    birthday: string;
    status: string;
    hasDesireClass: string;
};

export type StudentListInfo = {
    key: string;
    title: string;
};

export type StudentListDictionary = {
    [key: string]: string;
};

export const studentListInfoArray: StudentListInfo[] = [
    {key: "fullName", title: "Full name"},
    {key: "email", title: "Email"},
    {key: "phoneNumber", title: "Phone number"},
    {key: "birthday", title: "Birthday"},
    {key: "status", title: "Status"},
    {key: "hasDesireClass", title: "Desired class"},
];

export const studentListInfoDictionary: StudentListDictionary = {
    fullName: "Full name",
    email: "Email",
    phoneNumber: "Phone number",
    birthday: "Birthday",
    status: "Status",
    hasDesireClass: "Desired class",
};
