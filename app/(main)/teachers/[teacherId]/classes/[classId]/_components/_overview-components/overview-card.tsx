import React, {ReactElement} from "react";
import OverviewCardContent from "./overview-card-content";

const OverviewCard = (): ReactElement => {
    return (
        <div className="pt-3 flex flex-row">
            <div className="min-w-full grid grid-cols-4 gap-x-5">
                <OverviewCardContent
                    cardTitle="Number of students"
                    cardValue="45"
                />

                <OverviewCardContent
                    cardTitle="Class progress"
                    cardValue="27"
                />

                <OverviewCardContent cardTitle="Class goal" cardValue="50" />

                <OverviewCardContent
                    cardTitle="Tuition fee"
                    cardValue={"15" + "$"}
                />
            </div>
        </div>
    );
};

export default OverviewCard;
