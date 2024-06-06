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
};

export type ParentInfoData = {
    id: string;
    fullName: string;
};

export type StudentInfoDef = {
    key: string;
    title: string;
};

export const StudentInfoArray: StudentInfoDef[] = [
    {key: "id", title: "ID"},
    {key: "fullName", title: "Full name"},
    {key: "gender", title: "Gender"},
    {key: "phoneNumber", title: "Phone number"},
    {key: "email", title: "Email"},
    {key: "birthday", title: "Birthday"},
    {key: "tuitionPaid", title: "Tuition fee"},
];

export const StudentInfoDictionary: TableDictionary = {
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
    DEBT,
    PAID,
}

export type PayingPopupDef = {
    key: string;
    title: string;
};

export const SessisonTableArray: PayingPopupDef[] = [
    {key: "time", title: "Time"}, // thời gian
    {key: "attendances", title: "Attendances"}, // số buổi học
    {key: "monthlyFee", title: "Amount"}, // tiền học tháng đó
    {key: "status", title: "Status"}, // trạng thái đóng tiền tháng đó
];

export type TableDictionary = {
    [key: string]: string;
};

export const PayingPopupDictionary: TableDictionary = {
    time: "Time",
    attendanceCount: "Attendances",
    monthlyFee: "Amount",
    status: "Status",
};
