export type ColumnsModel = {
    key: string;
    title: string;
};

export type ColumnsDictionary = {
    [key: string]: string;
};

export type DesiredClassColumns = {
    className: string;
    year: string;
    startDate: string;
    endDate: string;
    studyingTime: string;
    studentInClass: string; // số học sinh đã có / số học sinh tối đa
};

export const desiredClassColumnsArray: ColumnsModel[] = [
    {key: "className", title: "Class"},
    {key: "year", title: "Year"},
    {key: "startDate", title: "Start"},
    {key: "endDate", title: "End"},
    {key: "studyingTime", title: "Time"},
    {key: "studentInClass", title: "Students"}, // số học sinh đã có / số học sinh tối đa
];

export const desiredClassColumnsDictionary: ColumnsDictionary = {
    className: "Class",
    year: "Year",
    startDate: "Start",
    endDate: "End",
    studyingTime: "Time",
    studentInClass: "Students", // số học sinh đã có / số học sinh tối đa
    actions: "Actions",
};
