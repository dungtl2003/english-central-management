export type TeacherModel = {
    fullName: string;
    id: string;
    birthday: string;
    createDate: string;
};

export type UnitModel = {
    unit_year: string;
    maxSessions: string;
    maxStudents: string;
    studyTime: {
        hours: string;
        minutes: string;
        seconds: string;
    };
    pricePerSession: string;
};

export const teacherDummyData: TeacherModel[] = [
    {
        fullName: "Nguyễn Minh Đức",
        id: "123456789123456789123456879a",
        birthday: "01/01/2003",
        createDate: "01/01/2022",
    },
    {
        fullName: "Trần Lưu Dũng",
        id: "123456789123456789123456879b",
        birthday: "02/01/2003",
        createDate: "02/01/2022",
    },
    {
        fullName: "Trần Lưu Dũng",
        id: "123456789123456789123456879o",
        birthday: "02/01/2003",
        createDate: "02/01/2022",
    },
    {
        fullName: "Nguyễn Hữu Nhật Quang",
        id: "123456789123456789123456879c",
        birthday: "03/01/2003",
        createDate: "03/01/2022",
    },
    {
        fullName: "Nguyễn Gia Huy",
        id: "123456789123456789123456879d",
        birthday: "04/01/2003",
        createDate: "04/01/2022",
    },
    {
        fullName: "Nguyễn Quang Minh",
        id: "123456789123456789123456879e",
        birthday: "05/01/2003",
        createDate: "05/01/2022",
    },
    {
        fullName: "Nguyễn Thảo Chi",
        id: "123456789123456789123456879f",
        birthday: "06/01/2003",
        createDate: "06/01/2022",
    },
    {
        fullName: "Trịnh Văn Bình",
        id: "123456789123456789123456879g",
        birthday: "07/01/2003",
        createDate: "07/01/2022",
    },
    {
        fullName: "Bùi Minh Khánh",
        id: "123456789123456789123456879h",
        birthday: "08/01/2003",
        createDate: "08/01/2022",
    },
    {
        fullName: "Khương Quốc Vượng",
        id: "123456789123456789123456879i",
        birthday: "09/01/2003",
        createDate: "09/01/2022",
    },
    {
        fullName: "Nguyễn Thị Thảo",
        id: "123456789123456789123456879j",
        birthday: "10/01/2003",
        createDate: "10/01/2022",
    },
    {
        fullName: "Trần Hồng Vân",
        id: "123456789123456789123456879k",
        birthday: "11/01/2003",
        createDate: "11/01/2022",
    },
    {
        fullName: "Mai Thanh Nga",
        id: "123456789123456789123456879l",
        birthday: "12/01/2003",
        createDate: "12/01/2022",
    },
    {
        fullName: "Nguyễn Hoàng Dũng",
        id: "123456789123456789123456879m",
        birthday: "13/01/2003",
        createDate: "13/01/2022",
    },
    {
        fullName: "Trần Chí Nhật",
        id: "123456789123456789123456879n",
        birthday: "13/01/2003",
        createDate: "13/01/2022",
    },
];

export const unitDummyData: UnitModel[] = [
    {
        unit_year: "U_01 - 2024",
        maxSessions: "50",
        maxStudents: "45",
        studyTime: {
            hours: "2",
            minutes: "30",
            seconds: "00",
        },
        pricePerSession: "7$",
    },
    {
        unit_year: "U_02 - 2024",
        maxSessions: "50",
        maxStudents: "50",
        studyTime: {
            hours: "2",
            minutes: "00",
            seconds: "00",
        },
        pricePerSession: "7$",
    },
    {
        unit_year: "U_03 - 2024",
        maxSessions: "45",
        maxStudents: "40",
        studyTime: {
            hours: "2",
            minutes: "30",
            seconds: "00",
        },
        pricePerSession: "7$",
    },
    {
        unit_year: "U_04 - 2024",
        maxSessions: "45",
        maxStudents: "40",
        studyTime: {
            hours: "2",
            minutes: "30",
            seconds: "00",
        },
        pricePerSession: "7$",
    },
    {
        unit_year: "U_05 - 2024",
        maxSessions: "45",
        maxStudents: "40",
        studyTime: {
            hours: "2",
            minutes: "30",
            seconds: "00",
        },
        pricePerSession: "7$",
    },
    {
        unit_year: "U_06 - 2024",
        maxSessions: "45",
        maxStudents: "40",
        studyTime: {
            hours: "2",
            minutes: "30",
            seconds: "00",
        },
        pricePerSession: "7$",
    },
    {
        unit_year: "U_07 - 2024",
        maxSessions: "45",
        maxStudents: "40",
        studyTime: {
            hours: "2",
            minutes: "30",
            seconds: "00",
        },
        pricePerSession: "7$",
    },
    {
        unit_year: "U_08 - 2024",
        maxSessions: "45",
        maxStudents: "40",
        studyTime: {
            hours: "2",
            minutes: "30",
            seconds: "00",
        },
        pricePerSession: "7$",
    },
    {
        unit_year: "U_09 - 2024",
        maxSessions: "45",
        maxStudents: "40",
        studyTime: {
            hours: "2",
            minutes: "30",
            seconds: "00",
        },
        pricePerSession: "7$",
    },
    {
        unit_year: "U_10 - 2024",
        maxSessions: "45",
        maxStudents: "40",
        studyTime: {
            hours: "2",
            minutes: "30",
            seconds: "00",
        },
        pricePerSession: "7$",
    },
    {
        unit_year: "U_11- 2024",
        maxSessions: "45",
        maxStudents: "40",
        studyTime: {
            hours: "2",
            minutes: "30",
            seconds: "00",
        },
        pricePerSession: "7$",
    },
];
