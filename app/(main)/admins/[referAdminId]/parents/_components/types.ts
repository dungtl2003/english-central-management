export type ParentListModel = {
    fullName: string;
    phoneNumber: string;
    birthday: string;
    gender: string;
    children: string;
};

export type ParentListInfo = {
    key: string;
    title: string;
};

export type ParentListDictionary = {
    [key: string]: string;
};

export const parentListInfoArray: ParentListInfo[] = [
    {key: "fullName", title: "Full name"},
    {key: "phoneNumber", title: "Phone number"},
    {key: "birthday", title: "Birthday"},
    {key: "gender", title: "Gender"},
    {key: "children", title: "Children"},
];

export const parentListInfoDictionary: ParentListDictionary = {
    fullName: "Full name",
    phoneNumber: "Phone number",
    birthday: "Birthday",
    gender: "Gender",
    children: "Children",
};
