export type ClassListModel = {
    classId: string;
    className: string;
    year: string;
    students: string;
    waiting: string;
    teacher: string;
    status: string;
    // schedule: string;
    // progress: string;
    startDate: string;
    endDate: string;
};

export type UnitModel = {
    unitId: string;
    grade: string;
    year: string;
    pricePerSession: string;
    maxSessions: string;
    maxStudents: string;
    studyTime: {
        hours: string;
        minutes: string;
        seconds: string;
    };
};

export type TeacherModel = {
    teacherId: string;
    fullName: string;
    birthday: string;
    createDate: string;
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
    {key: "year", title: "Year"},
    {key: "students", title: "Students"},
    {key: "waiting", title: "Waiting"},
    {key: "teacher", title: "Teacher"},
    {key: "status", title: "Status"},
    // {key: "progress", title: "Progress"},
    {key: "startDate", title: "Start"},
    {key: "endDate", title: "End"},
    // {key: "schedule", title: "Schedule"},
];

export const classListInfoDictionary: ClassListDictionary = {
    className: "Class",
    year: "Year",
    students: "Students",
    waiting: "Waiting",
    teacher: "Teacher",
    status: "Status",
    // schedule: "Schedule",
    // progress: "Progress",
    startDate: "Start",
    endDate: "End",
};

export type ClassStatistics = {
    total: number;
    active: number;
    waiting: number;
    closed: number;
};
