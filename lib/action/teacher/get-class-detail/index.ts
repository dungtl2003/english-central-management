import {ErrorResponsePayload} from "@/constaints";
import {
    InputType,
    OutputType,
    ReturnType,
    TotalPriceByMonthYear,
} from "./types";
import {roundUp} from "@/lib/utils";

interface AttendancesByMonthYear {
    [monthYear: string]: number;
}

export const handler = async (data: InputType): Promise<ReturnType> => {
    console.log("Timestamp: ", new Date().toLocaleString());

    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;
    const classId = data.classId;

    try {
        const getClassUrl = `${protocol}://${domain}/api/v2/classes/${classId}`;
        const getClassResponse = await fetch(getClassUrl, {
            method: "GET",
        });

        const getClassPayload = await getClassResponse.json();
        if (getClassResponse.status !== 200) {
            throw new Error((<ErrorResponsePayload>getClassPayload).error);
        }

        const data = getClassPayload as OutputType;
        updateData(data);
        return {data: data};
    } catch (error) {
        return {error: (<Error>error).message};
    }
};

const updateData = (data: OutputType): void => {
    data!.students.forEach((student) => {
        //handle case where 1 place still in older month than other
        const todayAfter12Hours = new Date();
        todayAfter12Hours.setHours(todayAfter12Hours.getHours() + 12);

        const todayUTCMonthAfter12Hours = todayAfter12Hours.getUTCMonth();
        const todayUTCYearAfter12Hours = todayAfter12Hours.getUTCFullYear();

        const attendancesByMonthYear = student.student.attendances
            .filter((attendance) => {
                const attendedTime = new Date(attendance.session.attendedTime!);
                const attendedYear = attendedTime.getUTCFullYear();
                const attendedMonth = attendedTime.getUTCMonth();

                if (
                    attendedYear > todayUTCYearAfter12Hours ||
                    (attendedYear === todayUTCYearAfter12Hours &&
                        attendedMonth >= todayUTCMonthAfter12Hours)
                ) {
                    return false;
                }

                return true;
            })
            .reduce((result, curr) => {
                const attendedTime = new Date(curr.session.attendedTime!);
                const key = `${attendedTime.getUTCMonth()}_${attendedTime.getUTCFullYear()}`;
                return {
                    ...result,
                    [key]: (result[key] ?? 0) + 1,
                } as AttendancesByMonthYear;
            }, {} as AttendancesByMonthYear);

        student.student.totalPriceByMonthYearList = [];
        for (const tuition of student.student.tuitions) {
            const key = `${tuition.month}_${tuition.year}`;
            if (tuition.classId !== data!.id) continue;

            student.student.totalPriceByMonthYearList.push({
                month: tuition.month,
                year: tuition.year,
                isPaid: true,
                totalPrice: Number(tuition.amount),
                attendances: attendancesByMonthYear[key],
            } as TotalPriceByMonthYear);

            delete attendancesByMonthYear[key];
        }

        let key: string;
        for (key in attendancesByMonthYear) {
            const [month, year] = key.split("_");
            student.student.totalPriceByMonthYearList.push({
                month: Number(month),
                year: Number(year),
                isPaid: false,
                totalPrice: roundUp(
                    attendancesByMonthYear[key] *
                        Number(data!.unit.pricePerSession),
                    2
                ),
                attendances: attendancesByMonthYear[key],
            } as TotalPriceByMonthYear);
        }
    });
};
