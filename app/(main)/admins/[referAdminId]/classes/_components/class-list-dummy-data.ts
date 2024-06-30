import {ClassListModel, UnitModel, TeacherModel} from "./types";

export const classListDummyData: ClassListModel[] = [
    {
        className: "1.1",
        grade: "1",
        students: "0/50",
        waiting: "10",
        progress: "0/50",
        startDate: "01/07/2024",
        endDate: "01/01/2025",
        teacher: "Trần Lưu Dũng",
        schedule: "Monday: 7h30 - 9h30, Wednesday: 7h30 - 9h30",
        status: "Waiting",
    },
    {
        className: "1.2",
        grade: "1",
        students: "45/50",
        waiting: "5",
        progress: "3/50",
        startDate: "02/07/2024",
        endDate: "02/01/2025",
        teacher: "Nguyễn Hữu Nhật Quang",
        schedule: "Tuesday: 7h30 - 9h30, Thursday: 7h30 - 9h30",
        status: "Active",
    },
    {
        className: "1.3",
        grade: "1",
        students: "45/50",
        waiting: "8",
        progress: "3/50",
        startDate: "03/07/2024",
        endDate: "03/01/2025",
        teacher: "Nguyễn Quang Minh",
        schedule: "Wednesday: 7h30 - 9h30, Friday: 7h30 - 9h30",
        status: "Active",
    },
    {
        className: "1.4",
        grade: "1",
        students: "45/50",
        waiting: "12",
        progress: "3/50",
        startDate: "04/07/2024",
        endDate: "04/01/2025",
        teacher: "Nguyễn Gia Huy",
        schedule: "Thursday: 7h30 - 9h30, Saturday: 7h30 - 9h30",
        status: "Active",
    },
    {
        className: "2.1",
        grade: "2",
        students: "45/50",
        waiting: "5",
        progress: "3/50",
        startDate: "05/07/2024",
        endDate: "05/01/2025",
        teacher: "Nguyễn Trung Hiếu",
        schedule: "Monday: 7h30 - 9h30, Wednesday: 7h30 - 9h30",
        status: "Active",
    },
    {
        className: "2.2",
        grade: "2",
        students: "0/50",
        waiting: "20",
        progress: "0/50",
        startDate: "06/07/2024",
        endDate: "06/01/2025",
        teacher: "",
        schedule: "Tuesday: 7h30 - 9h30, Thursday: 7h30 - 9h30",
        status: "Waiting",
    },
    {
        className: "2.3",
        grade: "2",
        students: "45/50",
        waiting: "7",
        progress: "3/50",
        startDate: "07/07/2024",
        endDate: "07/01/2025",
        teacher: "Nguyễn Thảo Chi",
        schedule: "Wednesday: 7h30 - 9h30, Friday: 7h30 - 9h30",
        status: "Active",
    },
    {
        className: "2.4",
        grade: "2",
        students: "45/50",
        waiting: "10",
        progress: "3/50",
        startDate: "08/07/2024",
        endDate: "08/01/2025",
        teacher: "Trần Lưu Dũng",
        schedule: "Thursday: 7h30 - 9h30, Saturday: 7h30 - 9h30",
        status: "Active",
    },
    {
        className: "3.1",
        grade: "3",
        students: "45/50",
        waiting: "15",
        progress: "3/50",
        startDate: "15/04/2024",
        endDate: "15/10/2024",
        teacher: "Nguyễn Minh Đức",
        schedule: "Monday: 7h30 AM - 9h30 AM, Wednesday: 7h30 AM - 9h30 AM",
        status: "Active",
    },
    {
        className: "3.2",
        grade: "3",
        students: "45/50",
        waiting: "5",
        progress: "3/50",
        startDate: "16/04/2024",
        endDate: "16/10/2024",
        teacher: "Nguyễn Minh Đức",
        schedule: "Tuesday: 7h30 - 9h30, Thursday: 7h30 - 9h30",
        status: "Active",
    },
    {
        className: "3.3",
        grade: "3",
        students: "45/50",
        waiting: "12",
        progress: "3/50",
        startDate: "20/04/2024",
        endDate: "20/10/2024",
        teacher: "Nguyễn Minh Đức",
        schedule: "Saturday: 7h30 - 9h30, Sunday: 7h30 - 9h30",
        status: "Active",
    },
    {
        className: "3.4",
        grade: "3",
        students: "45/50",
        waiting: "6",
        progress: "3/50",
        startDate: "19/04/2024",
        endDate: "19/10/2024",
        teacher: "Nguyễn Minh Đức",
        schedule: "Friday: 7h30 - 9h30",
        status: "Active",
    },
    {
        className: "4.1",
        grade: "4",
        students: "0/50",
        waiting: "10",
        progress: "0/50",
        startDate: "01/08/2024",
        endDate: "01/02/2025",
        teacher: "Nguyễn Hữu Nhật Quang",
        schedule: "Monday: 7h30 - 9h30, Wednesday: 7h30 - 9h30",
        status: "Waiting",
    },
    {
        className: "4.2",
        grade: "4",
        students: "45/50",
        waiting: "5",
        progress: "3/50",
        startDate: "02/08/2024",
        endDate: "02/02/2025",
        teacher: "Nguyễn Quang Minh",
        schedule: "Tuesday: 7h30 - 9h30, Thursday: 7h30 - 9h30",
        status: "Active",
    },
    {
        className: "4.3",
        grade: "4",
        students: "45/50",
        waiting: "8",
        progress: "3/50",
        startDate: "03/08/2024",
        endDate: "03/02/2025",
        teacher: "Nguyễn Gia Huy",
        schedule: "Wednesday: 7h30 - 9h30, Friday: 7h30 - 9h30",
        status: "Active",
    },
    {
        className: "4.4",
        grade: "4",
        students: "45/50",
        waiting: "12",
        progress: "3/50",
        startDate: "04/08/2024",
        endDate: "04/02/2025",
        teacher: "Nguyễn Trung Hiếu",
        schedule: "Thursday: 7h30 - 9h30, Saturday: 7h30 - 9h30",
        status: "Active",
    },
    {
        className: "5.1",
        grade: "5",
        students: "45/50",
        waiting: "15",
        progress: "3/50",
        startDate: "10/09/2024",
        endDate: "10/03/2025",
        teacher: "Trịnh Văn Bình",
        schedule: "Monday: 7h30 - 9h30, Wednesday: 7h30 - 9h30",
        status: "Active",
    },
    {
        className: "5.2",
        grade: "5",
        students: "45/50",
        waiting: "5",
        progress: "3/50",
        startDate: "11/09/2024",
        endDate: "11/03/2025",
        teacher: "Nguyễn Thảo Chi",
        schedule: "Tuesday: 7h30 - 9h30, Thursday: 7h30 - 9h30",
        status: "Active",
    },
    {
        className: "5.3",
        grade: "5",
        students: "0/50",
        waiting: "18",
        progress: "0/50",
        startDate: "12/09/2024",
        endDate: "12/03/2025",
        teacher: "Trần Lưu Dũng",
        schedule: "Wednesday: 7h30 - 9h30, Friday: 7h30 - 9h30",
        status: "Waiting",
    },
    {
        className: "5.4",
        grade: "5",
        students: "45/50",
        waiting: "10",
        progress: "3/50",
        startDate: "13/09/2024",
        endDate: "13/03/2025",
        teacher: "Nguyễn Hữu Nhật Quang",
        schedule: "Thursday: 7h30 - 9h30, Saturday: 7h30 - 9h30",
        status: "Active",
    },
    {
        className: "6.1",
        grade: "6",
        students: "0/50",
        waiting: "20",
        progress: "0/50",
        startDate: "14/10/2024",
        endDate: "14/04/2025",
        teacher: "Nguyễn Quang Minh",
        schedule: "Monday: 7h30 - 9h30, Wednesday: 7h30 - 9h30",
        status: "Waiting",
    },
    {
        className: "6.2",
        grade: "6",
        students: "45/50",
        waiting: "5",
        progress: "3/50",
        startDate: "15/10/2024",
        endDate: "15/04/2025",
        teacher: "Nguyễn Gia Huy",
        schedule: "Tuesday: 7h30 - 9h30, Thursday: 7h30 - 9h30",
        status: "Active",
    },
    {
        className: "6.3",
        grade: "6",
        students: "45/50",
        waiting: "8",
        progress: "3/50",
        startDate: "16/10/2024",
        endDate: "16/04/2025",
        teacher: "Nguyễn Trung Hiếu",
        schedule: "Wednesday: 7h30 - 9h30, Friday: 7h30 - 9h30",
        status: "Active",
    },
    {
        className: "6.4",
        grade: "6",
        students: "45/50",
        waiting: "12",
        progress: "3/50",
        startDate: "17/10/2024",
        endDate: "17/04/2025",
        teacher: "Trịnh Văn Bình",
        schedule: "Thursday: 7h30 - 9h30, Saturday: 7h30 - 9h30",
        status: "Active",
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