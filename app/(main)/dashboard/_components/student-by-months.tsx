import React from "react";
import {
    VisXYContainer,
    VisAxis,
    VisTooltip,
    VisGroupedBar,
} from "@unovis/react";
import {GroupedBar, Scatter} from "@unovis/ts";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import {StudentChart, studentChartData} from "./student-by-months-dummy-data";
import {Button} from "@/components/ui/button";
import {IoIosArrowUp} from "react-icons/io";
import {IoIosArrowDown} from "react-icons/io";

const x = (d: StudentChart) => d.x;
const y = (d: StudentChart) => d.y;

const triggers = {
    [Scatter.selectors.point]: (d: StudentChart) =>
        `<span>x :  ${d.x}<br/>y :  ${d.y}</span>`,
    [GroupedBar.selectors.bar]: (d: StudentChart) =>
        `Students:  ${d.y}<br/>Month :  ${d.month}<br/>Change: ${
            d.change > 0 ? "+" + d.change : d.change
        }%`,
};

const StudentByMonths = () => {
    const [range, setRange] = React.useState<number>(10);
    const [data, setData] = React.useState<StudentChart[]>(
        studentChartData.slice(0, range)
    );

    const [colWidth, setColWidth] = React.useState<number>(50);

    React.useEffect(() => {
        setData(studentChartData.slice(0, range));
    }, [range]);

    const dateMap = data.reduce(
        (acc, curr) => {
            acc[curr.x] = curr.month;
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

    function setWidthBasedOnRange(range: number) {
        if (range >= 10 && range <= 20) setColWidth(50);
        else if (range >= 21 && range <= 30) setColWidth(35);
        else if (range >= 31 && range <= 40) setColWidth(25);
        else if (range >= 41 && range <= 50) setColWidth(20);
        else if (range >= 51 && range <= 60) setColWidth(15);
        else if (range >= 71 && range <= 80) setColWidth(13);
        else if (range >= 81 && range <= 100) setColWidth(10);
    }

    function handleOnIncrease() {
        const newRange = range + 10;

        if (newRange <= 100) {
            setRange(newRange);
            setWidthBasedOnRange(newRange);
        }
    }

    function handleOnDecrease() {
        const newRange = range - 10;

        if (newRange >= 10) {
            setRange(newRange);
            setWidthBasedOnRange(newRange);
        }
    }

    return (
        <div className="flex justify-center">
            <div className="grid grid-rows-8 pt-[80px]">
                <div className="flex justify-center items-center text-4xl">
                    Student Analysis Graph
                </div>
                <div className="grid grid-cols-5 items-center">
                    <div className="col-span-1 flex flex-rows items-center gap-1.5">
                        <Label className="px-1 text-[16px]">Range</Label>
                        <Input
                            className="w-[70px]"
                            type="number"
                            min={10}
                            step={10}
                            max={100}
                            value={range}
                            readOnly
                        />
                        <Button
                            className="rounded-full"
                            variant="outline"
                            onClick={() => handleOnDecrease()}
                            disabled={data.length === 10}
                        >
                            <IoIosArrowDown />
                        </Button>
                        <Button
                            className="rounded-full"
                            variant="outline"
                            onClick={() => handleOnIncrease()}
                            disabled={data.length === 100}
                        >
                            <IoIosArrowUp />
                        </Button>
                    </div>
                </div>
                <div className="min-w-[1200px] min-h-[450px] row-span-6 pt-2">
                    <VisXYContainer className="min-h-[450px]" data={data}>
                        <VisAxis
                            gridLine={false}
                            tickTextFontSize="12px"
                            tickLine={true}
                            type="x"
                            numTicks={9}
                            tickFormat={tickFormat}
                        ></VisAxis>
                        <VisAxis
                            gridLine={false}
                            tickTextFontSize="12px"
                            type="y"
                        ></VisAxis>
                        <VisGroupedBar
                            groupWidth={colWidth}
                            color={"#00E7B4"}
                            barMinHeight={1}
                            x={x}
                            y={y}
                        />
                        <VisTooltip triggers={triggers} />
                    </VisXYContainer>
                </div>
            </div>
        </div>
    );
};

export default StudentByMonths;
