import {db} from "@/lib/db";
import {Attendance} from "./types";

export const buildAttendanceUpdateQueries = (
    sessionId: string,
    attendances: Attendance[]
) => {
    return attendances.map((attendance) => {
        return db.attendance.update({
            where: {
                id: attendance.attendanceId,
                sessionId: sessionId,
            },
            data: {
                status: attendance.status,
                description: attendance.description,
                updatedAt: new Date(),
            },
        });
    });
};
