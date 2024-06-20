import React, {ReactElement} from "react";
import {
    VisXYContainer,
    VisGroupedBar,
    VisAxis,
    VisTooltip,
} from "@unovis/react";
import {GroupedBar} from "@unovis/ts";
import {OutputType} from "@/lib/action/teacher/get-class-detail/types";
// import {formatDate} from "@/lib/utils";
import {ClassChartData} from "./types";
// import {Time} from "@/lib/time";

const x = (d: ClassChartData) => d.x;
const y = [(d: ClassChartData) => d.presents];
const color = (d: ClassChartData, i: number) => ["#00E7B4"][i];

const formatData = (rawData: OutputType | undefined): ClassChartData[] => {
    const records: ClassChartData[] = [];
    if (!rawData) return records;

    // let index: number = 1;
    // rawData.sessions
    //     .filter((session) => session.actualStartTime)
    //     .sort(
    //         (/* session1, session2 */) =>

    //             new Date(/* session2.actualStartTime */).getTime() -
    //             new Date(/* session1.actualStartTime */).getTime()
    //     )
    //     .slice(0, 5)
    //     .reverse()
    //     .forEach((session) => {
    //         const presents = session.attendances.filter(
    //             (attendance) => attendance.status === "PRESENT"
    //         ).length;
    //         const absents = session.attendances.filter(
    //             (attendance) => attendance.status === "ABSENT"
    //         ).length;

    //         records.push({
    //             dateTime: `${formatDate(new Date(session.actualStartTime))}\n${Time.from(new Date(session.actualStartTime)).toString()}`,
    //             x: index++,
    //             presents: presents,
    //             absents: absents,
    //         });
    //     });

    return records;
};

const ClassChart: React.FC<{data: OutputType | undefined}> = ({
    data,
}): ReactElement => {
    const records = formatData(data);
    const triggers = {
        [GroupedBar.selectors.bar]: (d: ClassChartData) =>
            `Present:  ${d.presents}<br / >Absent :  ${d.absents}`,
    };

    const dateMap = records.reduce(
        (acc, curr) => {
            acc[curr.x] = curr.dateTime;
            return acc;
        },
        {} as Record<number, string>
    );

    const tickFormat = (tick: number | Date) => {
        if (typeof tick === "number") {
            return dateMap[tick];
        }
        return tick.toString();
    };

    return (
        <div className="w-full p-0 m-0 max-h-[320px] text-black">
            <VisXYContainer data={records}>
                <VisAxis
                    gridLine={false}
                    tickTextFontSize="12px"
                    tickFormat={tickFormat}
                    numTicks={records.length}
                    type="x"
                ></VisAxis>
                <VisAxis
                    gridLine={false}
                    tickTextFontSize="12px"
                    type="y"
                ></VisAxis>
                <VisGroupedBar
                    groupWidth={50}
                    color={color}
                    barMinHeight={1}
                    x={x}
                    y={y}
                />
                <VisTooltip triggers={triggers} />
            </VisXYContainer>
        </div>
    );
};

export default ClassChart;
