import React, {ReactElement} from "react";
import OverviewCardContent from "./overview-card-content";
import {OutputType} from "@/lib/action/teacher/get-class-detail/types";

interface DisplayData {
    numberOfStudents: string;
    classProgress: string;
    classGoal: string;
    totalFee: string;
}

const formatData = (data: OutputType | undefined): DisplayData => {
    return {
        numberOfStudents: data ? String(data.students.length) : "",
        classProgress: data
            ? String(
                  data.sessions.filter((session) => session.attendedTime).length
              )
            : "",
        classGoal: data ? String(data.unit.maxSessions) : "",
        totalFee: data
            ? "$" +
              String(
                  Math.round(
                      Number(data.unit.pricePerSession) *
                          data.unit.maxSessions *
                          100
                  ) / 100
              )
            : "",
    };
};

const OverviewCard: React.FC<{data: OutputType | undefined}> = ({
    data,
}): ReactElement => {
    const formattedData: DisplayData = formatData(data);

    return (
        <div className="pt-3 flex flex-row">
            <div className="min-w-full grid grid-cols-4 gap-x-5">
                <OverviewCardContent
                    cardTitle="Number of students"
                    cardValue={formattedData.numberOfStudents}
                />

                <OverviewCardContent
                    cardTitle="Class progress"
                    cardValue={formattedData.classProgress}
                />

                <OverviewCardContent
                    cardTitle="Class goal"
                    cardValue={formattedData.classGoal}
                />

                <OverviewCardContent
                    cardTitle="Total fee"
                    cardValue={formattedData.totalFee}
                />
            </div>
        </div>
    );
};

export default OverviewCard;
