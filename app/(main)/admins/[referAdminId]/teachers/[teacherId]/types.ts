export type TeacherDetailData = {
    teacherId: string;
    status: string;
    imageUrl: string;
} & {teacherInformationData: TeacherInformationData} & {
    salaryDetailData: SalaryDetailData[];
} & {classListData: ClassListData[]};

export type TeacherInformationData = {
    firstName: string;
    lastName: string;
    role: string;
    email: string;
    phoneNumber: string;
    identityCard: string;
    gender: string;
    baseSalary: string;
    monthlySalary: string;
    birthday: string;
    createDate: string;
    acceptDate: string | null;
};

export type SalaryDetailData = {
    monhthlyPaymentId: string;
    salary: string;
    month: string;
    year: string;
    paidAt: string;
};

export type ClassListData = {
    classId: string;
    grade: string;
    index: string;
    startTime: string;
    endTime: string;
    year: string;
    price: string;
};
