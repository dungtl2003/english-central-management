export type ColumnsModel = {
    key: string;
    title: string;
};

export type ColumnsDictionary = {
    [key: string]: string;
};

export type DesiredClassColumns = {
    classId: string;
    className: string;
    year: string;
    startDate: string;
    endDate: string;
    studentInClass: string; // số học sinh đã có / số học sinh tối đa
};

export const desiredClassColumnsArray: ColumnsModel[] = [
    {key: "className", title: "Class"},
    {key: "year", title: "Year"},
    {key: "startDate", title: "Start"},
    {key: "endDate", title: "End"},
    {key: "studentInClass", title: "Students"}, // số học sinh đã có / số học sinh tối đa
];

export const desiredClassColumnsDictionary: ColumnsDictionary = {
    className: "Class",
    year: "Year",
    startDate: "Start",
    endDate: "End",
    studentInClass: "Students", // số học sinh đã có / số học sinh tối đa
    actions: "Actions",
};
