import React, {ReactElement} from "react";
import OverviewCardContent from "./overview-card-content";
import {OutputType} from "@/lib/action/teacher/get-class-detail/types";
import {OverviewCardData, OverviewTitle} from "./types";
import {roundUp} from "@/lib/utils";

const formatData = (data: OutputType | undefined): OverviewCardData => {
    return {
        numberOfStudents: data ? String(data.students.length) : "",
        classProgress: data
            ? String(
                  data.sessions.filter((session) => session.attendedTime).length
              )
            : "",
        classGoal: data ? String(data.unit.maxSessions) : "",
        pricePerSession: data
            ? `$${roundUp(Number(data.unit.pricePerSession), 2)}`
            : "",
    };
};

const OverviewCard: React.FC<{data: OutputType | undefined}> = ({
    data,
}): ReactElement => {
    const formattedData: OverviewCardData = formatData(data);

    return (
        <div className="pt-3 flex flex-row">
            <div className="min-w-full grid grid-cols-4 gap-x-5">
                <OverviewCardContent
                    cardTitle={OverviewTitle.STUDENTS}
                    cardValue={formattedData.numberOfStudents}
                />

                <OverviewCardContent
                    cardTitle={OverviewTitle.PROGRESS}
                    cardValue={formattedData.classProgress}
                />

                <OverviewCardContent
                    cardTitle={OverviewTitle.GOAL}
                    cardValue={formattedData.classGoal}
                />

                <OverviewCardContent
                    cardTitle={OverviewTitle.PRICE_PER_SESSION}
                    cardValue={formattedData.pricePerSession}
                />
            </div>
        </div>
    );
};

export default OverviewCard;
