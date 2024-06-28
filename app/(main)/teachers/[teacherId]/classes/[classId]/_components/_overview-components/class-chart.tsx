// import React, {ReactElement} from "react";
// import {
//     VisXYContainer,
//     VisGroupedBar,
//     VisAxis,
//     VisTooltip,
// } from "@unovis/react";
// import {GroupedBar} from "@unovis/ts";
// import {OutputType} from "@/lib/action/teacher/get-class-detail/types";
// import {ClassChartData} from "./types";
// import {format} from "date-fns";

// const x = (d: ClassChartData) => d.x;
// const y = [(d: ClassChartData) => d.presents];
// const color = (_: ClassChartData, i: number) => ["#00E7B4"][i];

// const formatData = (rawData: OutputType | undefined): ClassChartData[] => {
//     const records: ClassChartData[] = [];
//     if (!rawData) return records;

//     let index: number = 1;
//     rawData.sessions
//         .filter((session) => session.attendedTime)
//         .sort(
//             (session1, session2) =>
//                 new Date(session2.actualStartTime!).getTime() -
//                 new Date(session1.actualStartTime!).getTime()
//         )
//         .slice(0, 5)
//         .reverse()
//         .forEach((session) => {
//             const presents = session.attendances.filter(
//                 (attendance) => attendance.status === "PRESENT"
//             ).length;
//             const absents = session.attendances.filter(
//                 (attendance) => attendance.status === "ABSENT"
//             ).length;
//             const lates = session.attendances.filter(
//                 (attendance) => attendance.status === "LATE"
//             ).length;

//             records.push({
//                 dateTime: `${format(session.actualStartTime!, "dd/MM/yyyy")}\n${format(session.actualStartTime!, "HH:mm:ss")}`,
//                 x: (index += 0.5),
//                 presents: presents,
//                 lates: lates,
//                 absents: absents,
//             });
//         });

//     return records;
// };

// const ClassChart: React.FC<{data: OutputType | undefined}> = ({
//     data,
// }): ReactElement => {
//     const records = formatData(data);
//     const triggers = {
//         [GroupedBar.selectors.bar]: (d: ClassChartData) =>
//             `Present:  ${d.presents}<br / >Late :  ${d.lates}<br / >Absent :  ${d.absents}`,
//     };

//     const dateMap = records.reduce(
//         (acc, curr) => {
//             acc[curr.x] = curr.dateTime;
//             return acc;
//         },
//         {} as Record<number, string>
//     );

//     const tickFormat = (tick: number | Date) => {
//         if (typeof tick === "number") {
//             return dateMap[tick];
//         }
//         return tick.toString();
//     };

//     return (
//         <div className="w-full p-0 m-0 max-h-[320px] text-black">
//             <VisXYContainer data={records}>
//                 <VisAxis
//                     gridLine={false}
//                     tickTextFontSize="12px"
//                     tickFormat={tickFormat}
//                     numTicks={records.length}
//                     type="x"
//                 ></VisAxis>
//                 <VisAxis
//                     gridLine={false}
//                     tickTextFontSize="12px"
//                     type="y"
//                 ></VisAxis>
//                 <VisGroupedBar
//                     groupWidth={50}
//                     color={color}
//                     barMinHeight={1}
//                     x={x}
//                     y={y}
//                 />
//                 <VisTooltip triggers={triggers} />
//             </VisXYContainer>
//         </div>
//     );
// };

// export default ClassChart;

import type {BulletLegendItemInterface} from "@unovis/ts";
import React, {useCallback} from "react";
import {CurveType, NumericAccessor} from "@unovis/ts";
import {VisXYContainer, VisAxis, VisArea, VisBulletLegend} from "@unovis/react";

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

export type DataRecord = {
    month: string;
    year: string;
    cases: {
        pr: number;
        la: number;
        ab: number;
    };
};

export const data: DataRecord[] = [
    {
        month: "Jan ",
        year: "2020",
        cases: {
            pr: 17,
            la: 34,
            ab: 56,
        },
    },
    {
        month: "Feb ",
        year: "2020",
        cases: {
            pr: 45,
            la: 67,
            ab: 89,
        },
    },
    {
        month: "Mar ",
        year: "2020",
        cases: {
            pr: 23,
            la: 78,
            ab: 12,
        },
    },
    {
        month: "Apr ",
        year: "2020",
        cases: {
            pr: 34,
            la: 45,
            ab: 23,
        },
    },
    {
        month: "May ",
        year: "2020",
        cases: {
            pr: 56,
            la: 12,
            ab: 45,
        },
    },
    {
        month: "Jun ",
        year: "2020",
        cases: {
            pr: 78,
            la: 34,
            ab: 67,
        },
    },
    {
        month: "Jul ",
        year: "2020",
        cases: {
            pr: 89,
            la: 23,
            ab: 78,
        },
    },
    {
        month: "Aug ",
        year: "2020",
        cases: {
            pr: 12,
            la: 56,
            ab: 34,
        },
    },
    {
        month: "Sep ",
        year: "2020",
        cases: {
            pr: 45,
            la: 67,
            ab: 23,
        },
    },
    {
        month: "Oct ",
        year: "2020",
        cases: {
            pr: 67,
            la: 12,
            ab: 45,
        },
    },
    {
        month: "Nov ",
        year: "2020",
        cases: {
            pr: 34,
            la: 78,
            ab: 56,
        },
    },
];

export default function ClassChart(): JSX.Element {
    const x = useCallback((_: DataRecord, i: number) => i, []);

    const Accessors = (
        id: Status
    ): {y: NumericAccessor<DataRecord>; color: string | undefined} => ({
        y: useCallback((d: DataRecord) => d.cases[id], []),
        color: statuses[id].color,
    });

    const xTicks = useCallback(
        (i: number | Date) =>
            [
                data[parseInt(i.toString())].month,
                data[parseInt(i.toString())].year,
            ].join(""),
        []
    );

    const yTicksFormatter = Intl.NumberFormat(navigator.language, {
        notation: "compact",
    }).format;

    const yTicks = (tick: number | Date) => {
        if (typeof tick === "number") {
            return yTicksFormatter(tick);
        }
        return tick.toString();
    };

    return (
        <div className="w-full p-0 pt-5 px-2 m-0 text-black">
            <VisXYContainer data={data} height="280px" className="custom-area">
                <VisBulletLegend
                    className="flex items-center justify-center"
                    items={Object.values(statuses)}
                />
                <VisArea
                    minHeight1Px={true}
                    {...Accessors(Status.Present)}
                    x={x}
                    curveType={CurveType.Basis}
                />
                <VisArea
                    minHeight1Px={true}
                    {...Accessors(Status.Late)}
                    x={x}
                    curveType={CurveType.Basis}
                />
                <VisArea
                    minHeight1Px={true}
                    {...Accessors(Status.Absent)}
                    x={x}
                    curveType={CurveType.Basis}
                />
                <VisAxis type="x" gridLine={false} tickFormat={xTicks} />
                <VisAxis type="y" tickFormat={yTicks} />
            </VisXYContainer>
        </div>
    );
}
