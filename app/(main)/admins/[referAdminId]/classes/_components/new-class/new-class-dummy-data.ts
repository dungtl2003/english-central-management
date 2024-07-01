import {TeacherModel, UnitModel} from "./types";

// export type TeacherModel = {
//     fullName: string;
//     teacherId: string;
//     birthday: string;
//     createDate: string;
// };

// export type UnitModel = {
//     unit_year: string;
//     maxSessions: string;
//     maxStudents: string;
//     studyTime: {
//         hours: string;
//         minutes: string;
//         seconds: string;
//     };
//     pricePerSession: string;
// };

export const teacherDummyData: TeacherModel[] = [
    {
        fullName: "Nguyễn Minh Đức",
        teacherId: "123456789123456789123456879a",
        birthday: "01/01/2003",
        createDate: "01/01/2022",
    },
    {
        fullName: "Trần Lưu Dũng",
        teacherId: "123456789123456789123456879b",
        birthday: "02/01/2003",
        createDate: "02/01/2022",
    },
    {
        fullName: "Trần Lưu Dũng",
        teacherId: "123456789123456789123456879o",
        birthday: "02/01/2003",
        createDate: "02/01/2022",
    },
    {
        fullName: "Nguyễn Hữu Nhật Quang",
        teacherId: "123456789123456789123456879c",
        birthday: "03/01/2003",
        createDate: "03/01/2022",
    },
    {
        fullName: "Nguyễn Gia Huy",
        teacherId: "123456789123456789123456879d",
        birthday: "04/01/2003",
        createDate: "04/01/2022",
    },
    {
        fullName: "Nguyễn Quang Minh",
        teacherId: "123456789123456789123456879e",
        birthday: "05/01/2003",
        createDate: "05/01/2022",
    },
    {
        fullName: "Nguyễn Thảo Chi",
        teacherId: "123456789123456789123456879f",
        birthday: "06/01/2003",
        createDate: "06/01/2022",
    },
    {
        fullName: "Trịnh Văn Bình",
        teacherId: "123456789123456789123456879g",
        birthday: "07/01/2003",
        createDate: "07/01/2022",
    },
    {
        fullName: "Bùi Minh Khánh",
        teacherId: "123456789123456789123456879h",
        birthday: "08/01/2003",
        createDate: "08/01/2022",
    },
    {
        fullName: "Khương Quốc Vượng",
        teacherId: "123456789123456789123456879i",
        birthday: "09/01/2003",
        createDate: "09/01/2022",
    },
    {
        fullName: "Nguyễn Thị Thảo",
        teacherId: "123456789123456789123456879j",
        birthday: "10/01/2003",
        createDate: "10/01/2022",
    },
    {
        fullName: "Trần Hồng Vân",
        teacherId: "123456789123456789123456879k",
        birthday: "11/01/2003",
        createDate: "11/01/2022",
    },
    {
        fullName: "Mai Thanh Nga",
        teacherId: "123456789123456789123456879l",
        birthday: "12/01/2003",
        createDate: "12/01/2022",
    },
    {
        fullName: "Nguyễn Hoàng Dũng",
        teacherId: "123456789123456789123456879m",
        birthday: "13/01/2003",
        createDate: "13/01/2022",
    },
    {
        fullName: "Trần Chí Nhật",
        teacherId: "123456789123456789123456879n",
        birthday: "13/01/2003",
        createDate: "13/01/2022",
    },
];

export const unitDummyData: UnitModel[] = [
    {
        unitId: "12",
        year: "U_01 - 2024",
        maxSessions: "50",
        maxStudents: "45",
        studyTime: {
            hours: "2",
            minutes: "30",
            seconds: "00",
        },
        pricePerSession: "7$",

        grade: "",
    },
    {
        unitId: "13",
        year: "U_02 - 2024",
        maxSessions: "50",
        maxStudents: "50",
        studyTime: {
            hours: "2",
            minutes: "00",
            seconds: "00",
        },
        pricePerSession: "7$",
        grade: "",
    },
    // {
    //     year: "U_03 - 2024",
    //     maxSessions: "45",
    //     maxStudents: "40",
    //     studyTime: {
    //         hours: "2",
    //         minutes: "30",
    //         seconds: "00",
    //     },
    //     pricePerSession: "7$",
    //     unitId: "12",
    //     grade: ""
    // },
    // {
    //     year: "U_04 - 2024",
    //     maxSessions: "45",
    //     maxStudents: "40",
    //     studyTime: {
    //         hours: "2",
    //         minutes: "30",
    //         seconds: "00",
    //     },
    //     pricePerSession: "7$",
    //     unitId: "12",
    //     grade: ""
    // },
    // {
    //     year: "U_05 - 2024",
    //     maxSessions: "45",
    //     maxStudents: "40",
    //     studyTime: {
    //         hours: "2",
    //         minutes: "30",
    //         seconds: "00",
    //     },
    //     pricePerSession: "7$",
    //     unitId: "12",
    //     grade: ""
    // },
    // {
    //     year: "U_06 - 2024",
    //     maxSessions: "45",
    //     maxStudents: "40",
    //     studyTime: {
    //         hours: "2",
    //         minutes: "30",
    //         seconds: "00",
    //     },
    //     pricePerSession: "7$",
    //     unitId: "12",
    //     grade: ""
    // },
    // {
    //     year: "U_07 - 2024",
    //     maxSessions: "45",
    //     maxStudents: "40",
    //     studyTime: {
    //         hours: "2",
    //         minutes: "30",
    //         seconds: "00",
    //     },
    //     pricePerSession: "7$",
    //     unitId: "12",
    //     grade: ""
    // },
    // {
    //     year: "U_08 - 2024",
    //     maxSessions: "45",
    //     maxStudents: "40",
    //     studyTime: {
    //         hours: "2",
    //         minutes: "30",
    //         seconds: "00",
    //     },
    //     pricePerSession: "7$",
    //     unitId: "12",
    //     grade: ""
    // },
    // {
    //     year: "U_09 - 2024",
    //     maxSessions: "45",
    //     maxStudents: "40",
    //     studyTime: {
    //         hours: "2",
    //         minutes: "30",
    //         seconds: "00",
    //     },
    //     pricePerSession: "7$",
    //     unitId: "12",
    //     grade: ""
    // },
    // {
    //     year: "U_10 - 2024",
    //     maxSessions: "45",
    //     maxStudents: "40",
    //     studyTime: {
    //         hours: "2",
    //         minutes: "30",
    //         seconds: "00",
    //     },
    //     pricePerSession: "7$",
    //     unitId: "12",
    //     grade: ""
    // },
    // {
    //     year: "U_11- 2024",
    //     maxSessions: "45",
    //     maxStudents: "40",
    //     studyTime: {
    //         hours: "2",
    //         minutes: "30",
    //         seconds: "00",
    //     },
    //     pricePerSession: "7$",
    //     unitId: "12",
    //     grade: ""
    // },
];
