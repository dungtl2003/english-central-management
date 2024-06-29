export type UnitListModel = {
    year: string;
    grade: string;
    maxSessions: string;
    maxStudents: string;
    studyTime: {
        studyHour: string;
        studyMinute: string;
        studySecond: string;
    };
    pricePerSession: string;
    createdTime: string;
    classes: string;
};

export type UnitListInfo = {
    key: string;
    title: string;
};

export type UnitListDictionary = {
    [key: string]: string;
};

export const unitListInfoArray: UnitListInfo[] = [
    {key: "year", title: "Year"},
    {key: "grade", title: "Grade"},
    {key: "priceperSession", title: "Price"},
    {key: "createdTime", title: "Created time"},
    {key: "classes", title: "Classes"},
];

export const unitListInfoDictionary: UnitListDictionary = {
    year: "Year",
    grade: "Grade",
    pricePerSession: "Price",
    createdTime: "Created time",
    classes: "Classes",
};
