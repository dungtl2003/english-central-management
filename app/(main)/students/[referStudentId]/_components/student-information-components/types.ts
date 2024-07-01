export type StudentInfoFormatData = {
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
    parents: ParentPreviewData[];
};

export type ParentPreviewData = {
    imgUrl: string;
    fullName: string;
    id: string;
    email: string;
    phoneNumber: string;
    identityCard: string;
};
