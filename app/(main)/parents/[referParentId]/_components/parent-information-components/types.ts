export type ParentInfoFormatData = {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    identityCard: string;
    birthday: string;
    role: string;
    discount: string;
    createDate: string;
    deleleDate: string;
} & {
    students: StudentPreviewData[];
};

export type StudentPreviewData = {
    imgUrl: string;
    fullName: string;
    id: string;
    email: string;
    phoneNumber: string;
    identityCard: string;
};
