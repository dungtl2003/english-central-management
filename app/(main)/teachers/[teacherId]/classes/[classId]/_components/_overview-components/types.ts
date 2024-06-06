export interface OverviewCardData {
    numberOfStudents: string;
    classProgress: string;
    classGoal: string;
    pricePerSession: string;
}

export interface ClassChartData {
    dateTime: string;
    x: number;
    presents: number;
    absents: number;
}

export interface ClassBasicInfoData {
    className: string;
    grade: string;
    startDate: string;
    endDate: string;
    timeZone: string;
}

export enum OverviewTitle {
    STUDENTS = "Number of students",
    PROGRESS = "Class progress",
    GOAL = "Class goal",
    PRICE_PER_SESSION = "Price/session",
}
