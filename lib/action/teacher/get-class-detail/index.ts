import {
    InputType,
    OutputType,
    ReturnType,
    TotalPriceByMonthYear,
} from "./types";

interface AttendancesByMonthYear {
    [monthYear: string]: number;
}

const updateData = (data: OutputType): void => {
    data!.students.forEach((student) => {
        //handle case where 1 place still in older month than other
        const todayAfter12Hours = new Date();
        todayAfter12Hours.setHours(todayAfter12Hours.getHours() + 12);

        const todayUTCMonthAfter12Hours = todayAfter12Hours.getUTCMonth();
        const todayUTCYearAfter12Hours = todayAfter12Hours.getUTCFullYear();

        const attendancesByMonthYear = student.student.attendances
            .filter((attendance) => {
                const attendedTime = attendance.session.attendedTime!;
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
                const attendedTime = curr.session.attendedTime!;
                const key = `${attendedTime.getUTCMonth()}_${attendedTime!.getUTCFullYear()}`;
                return {
                    ...result,
                    [key]: (result[key] ?? 0) + 1,
                } as AttendancesByMonthYear;
            }, {} as AttendancesByMonthYear);

        student.student.totalPriceByMonthYearList =
            student.student.tuitions.map((tuition) => {
                const key = `${tuition.month}_${tuition.year}`;
                const isPaid =
                    tuition.classId === data!.id &&
                    key in attendancesByMonthYear;

                return {
                    month: tuition.month,
                    year: tuition.year,
                    isPaid: isPaid,
                    total: !isPaid
                        ? (attendancesByMonthYear[key] *
                              data!.unit.pricePerSession.toNumber() *
                              student.student.discount) /
                          100
                        : tuition.amount,
                } as TotalPriceByMonthYear;
            });
    });
    console.log(data!.students);
};

export const handler = async (data: InputType): Promise<ReturnType> => {
    console.log("Timestamp: ", new Date().toLocaleString());

    const domain = process.env.NEXT_PUBLIC_DOMAIN;
    const protocol = process.env.NEXT_PUBLIC_PROTOCOL;
    const teacherId = data.teacherId;
    const classId = data.classId;

    const url = `${protocol}://${domain}/api/teachers/${teacherId}/classes/${classId}`;

    console.log(`Sending GET request to ${url}`);

    try {
        const response = await fetch(url, {
            method: "GET",
        });

        const body = await response.json();
        console.log("Received: ", body);

        if (response.status !== 200) {
            return {error: body};
        }

        const data = body as OutputType;
        updateData(data);
        return {data: data};
    } catch (error) {
        return {error: (<Error>error).message};
    }
};
