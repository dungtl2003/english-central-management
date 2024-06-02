export type PayingPopupModel = {
    time: string;
    attendanceCount: string;
    monthlyFee: string;
    status: string;
};

export type PayingPopupDef = {
    key: string;
    title: string;
};

export const SessisonTableArray: PayingPopupDef[] = [
    {key: "time", title: "Time"}, // thời gian
    {key: "attendanceCount", title: "Attendances"}, // số buổi học
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
