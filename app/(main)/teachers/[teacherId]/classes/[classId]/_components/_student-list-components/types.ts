export type StudentInfoData = {
    id: string;
    fullName: string;
    email: string;
    birthday: string;
    tuitionPaid: string;
    gender: string;
    phoneNumber: string;
    payments: PayingPopupData[];
    discount: string;
    parents: ParentInfoData[];
    joinedAt: string;
};

export type ParentInfoData = {
    id: string;
    fullName: string;
};

export type StudentInfoDef = {
    key: string;
    title: string;
};

export const studentInfoArray: StudentInfoDef[] = [
    {key: "id", title: "ID"},
    {key: "fullName", title: "Full name"},
    {key: "gender", title: "Gender"},
    {key: "phoneNumber", title: "Phone number"},
    {key: "email", title: "Email"},
    {key: "birthday", title: "Birthday"},
    {key: "joinedAt", title: "Joined at"},
    {key: "tuitionPaid", title: "Tuition fee"},
];

export const studentInfoDictionary: TableDictionary = {
    fullName: "Full name",
    gender: "Gender",
    birthday: "Birthday",
    tuitionPaid: "Tuition fee",
};

export type PayingPopupData = {
    time: string;
    attendances: string;
    monthlyFee: string;
    status: PayingPopupStatus;
};

export enum PayingPopupStatus {
    DEBT = "DEBT",
    PAID = "PAID",
}

export type PayingPopupDef = {
    key: string;
    title: string;
};

export const sessisonTableArray: PayingPopupDef[] = [
    {key: "time", title: "Time"}, // must be Month (short name), Year in order to get data
    {key: "attendances", title: "Attendances"}, // số buổi học
    {key: "monthlyFee", title: "Amount"}, // tiền học tháng đó
    {key: "status", title: "Status"}, // trạng thái đóng tiền tháng đó
];

export type TableDictionary = {
    [key: string]: string;
};

export const payingPopupDictionary: TableDictionary = {
    select: "Select",
    time: "Time",
    attendances: "Attendances",
    monthlyFee: "Amount",
    status: "Status",
};
