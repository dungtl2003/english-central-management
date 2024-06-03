import React, {ReactElement} from "react";
import {
    VisXYContainer,
    VisGroupedBar,
    VisAxis,
    VisTooltip,
} from "@unovis/react";
import {GroupedBar} from "@unovis/ts";

type DataRecord = {date: string; x: number; y: number};
const x = (d: DataRecord) => d.x;
const y = [(d: DataRecord) => d.y];
const color = (d: DataRecord, i: number) => ["#00E7B4"][i];

const numberOfStudent: number = 45; // truyền sĩ số lớp vào đây

const triggers = {
    [GroupedBar.selectors.bar]: (d: DataRecord) =>
        `Present:  ${d.y}<br / >Absent :  ${numberOfStudent - d.y}`,
};

const data: DataRecord[] = [
    {date: "01/01/2024", x: 1, y: 45},
    {date: "01/08/2024", x: 2, y: 44},
    {date: "01/15/2024", x: 3, y: 42},
    {date: "01/22/2024", x: 4, y: 45},
    {date: "01/29/2024", x: 5, y: 44},
    {date: "02/05/2024", x: 6, y: 45},
    {date: "02/17/2024", x: 7, y: 41},
    {date: "02/24/2024", x: 8, y: 43},
    {date: "03/02/2024", x: 9, y: 40},
    {date: "03/09/2024", x: 10, y: 45},
];

const dateMap = data.reduce(
    (acc, curr) => {
        acc[curr.x] = curr.date;
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

const ClassChart = (): ReactElement => {
    return (
        <div className="w-full p-0 m-0 max-h-[320px] text-black">
            <VisXYContainer data={data}>
                <VisAxis
                    gridLine={false}
                    tickTextFontSize="12px"
                    tickFormat={tickFormat}
                    numTicks={data.length}
                    type="x"
                ></VisAxis>
                <VisAxis
                    gridLine={false}
                    tickTextFontSize="12px"
                    type="y"
                ></VisAxis>
                <VisGroupedBar
                    groupWidth={40}
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
