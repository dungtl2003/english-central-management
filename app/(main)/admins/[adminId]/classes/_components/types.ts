export type ClassListModel = {
    className: string;
    grade: string;
    students?: string;
    waiting?: string;
    progress?: string;
    startDate: string;
    endDate: string;
    teacher?: string;
    schedule: string;
    status: string;
};

export type ClassListInfo = {
    key: string;
    title: string;
};

export type ClassListDictionary = {
    [key: string]: string;
};

export const classListInfoArray: ClassListInfo[] = [
    {key: "className", title: "Class"},
    {key: "grade", title: "Grade"},
    {key: "students", title: "Students"},
    {key: "waiting", title: "Waiting"},
    {key: "progress", title: "Progress"},
    {key: "startDate", title: "Start"},
    {key: "endDate", title: "End"},
    {key: "teacher", title: "Teacher"},
    {key: "schedule", title: "Schedule"},
    {key: "status", title: "Status"},
];

export const classListInfoDictionary: ClassListDictionary = {
    className: "Class",
    grade: "Grade",
    students: "Students",
    waiting: "Waiting",
    progress: "Progress",
    startDate: "Start",
    endDate: "End",
    teacher: "Teacher",
    schedule: "Schedule",
    status: "Status",
};

export type ClassStatistics = {
    total: number;
    active: number;
    waiting: number;
    closed: number;
};
