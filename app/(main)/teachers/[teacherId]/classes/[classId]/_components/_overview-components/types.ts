import {BulletLegendItemInterface} from "@unovis/ts";

export interface OverviewCardData {
    numberOfStudents: string;
    classProgress: string;
    classGoal: string;
    pricePerSession: string;
}

export interface ClassChartData {
    dateTime: string;
    cases: {
        pr: number;
        la: number;
        ab: number;
    };
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

export enum Status {
    Present = "pr",
    Late = "la",
    Absent = "ab",
}

export const statuses: Record<Status, BulletLegendItemInterface> = {
    [Status.Present]: {name: "Present", color: "#00E7B4"},
    [Status.Late]: {name: "Late", color: "#F39D00"},
    [Status.Absent]: {name: "Absent", color: "#DA172C"},
};
