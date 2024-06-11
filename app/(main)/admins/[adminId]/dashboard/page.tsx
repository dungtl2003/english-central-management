"use client";

import React from "react";
import {
    VisXYContainer,
    VisLine,
    VisAxis,
    VisScatter,
    VisCrosshair,
    VisTooltip,
} from "@unovis/react";
import {Scatter} from "@unovis/ts";
import {Label} from "@/components/ui/label";
import {Input} from "@/components/ui/input";
import Link from "next/link";

type DataRecord = {x: number; y: number};

// Đây là data gốc gồm tất cả các học sinh của các tháng
const initialData: DataRecord[] = [
    {x: 1, y: 31},
    {x: 2, y: 26},
    {x: 3, y: 37},
    {x: 4, y: 21},
    {x: 5, y: 25},
    {x: 6, y: 38},
    {x: 7, y: 30},
    {x: 8, y: 33},
    {x: 9, y: 27},
    {x: 10, y: 39},
    {x: 11, y: 28},
    {x: 12, y: 40},
    {x: 13, y: 35},
    {x: 14, y: 23},
    {x: 15, y: 24},
    {x: 16, y: 36},
    {x: 17, y: 32},
    {x: 18, y: 22},
    {x: 19, y: 29},
    {x: 20, y: 25},
    {x: 21, y: 37},
    {x: 22, y: 31},
    {x: 23, y: 30},
    {x: 24, y: 21},
    {x: 25, y: 38},
    {x: 26, y: 33},
    {x: 27, y: 28},
    {x: 28, y: 39},
    {x: 29, y: 35},
    {x: 30, y: 40},
    {x: 31, y: 26},
    {x: 32, y: 22},
    {x: 33, y: 36},
    {x: 34, y: 32},
    {x: 35, y: 29},
    {x: 36, y: 23},
    {x: 37, y: 24},
    {x: 38, y: 34},
    {x: 39, y: 27},
    {x: 40, y: 25},
    {x: 41, y: 31},
    {x: 42, y: 37},
    {x: 43, y: 38},
    {x: 44, y: 21},
    {x: 45, y: 33},
    {x: 46, y: 28},
    {x: 47, y: 39},
    {x: 48, y: 32},
    {x: 49, y: 30},
    {x: 50, y: 26},
    {x: 51, y: 35},
    {x: 52, y: 40},
    {x: 53, y: 23},
    {x: 54, y: 36},
    {x: 55, y: 22},
    {x: 56, y: 24},
    {x: 57, y: 34},
    {x: 58, y: 29},
    {x: 59, y: 25},
    {x: 60, y: 31},
    {x: 61, y: 38},
    {x: 62, y: 27},
    {x: 63, y: 39},
    {x: 64, y: 21},
    {x: 65, y: 33},
    {x: 66, y: 28},
    {x: 67, y: 30},
    {x: 68, y: 26},
    {x: 69, y: 37},
    {x: 70, y: 32},
    {x: 71, y: 25},
    {x: 72, y: 35},
    {x: 73, y: 40},
    {x: 74, y: 22},
    {x: 75, y: 34},
    {x: 76, y: 29},
    {x: 77, y: 23},
    {x: 78, y: 36},
    {x: 79, y: 24},
    {x: 80, y: 38},
    {x: 81, y: 27},
    {x: 82, y: 39},
    {x: 83, y: 30},
    {x: 84, y: 21},
    {x: 85, y: 33},
    {x: 86, y: 28},
    {x: 87, y: 32},
    {x: 88, y: 26},
    {x: 89, y: 35},
    {x: 90, y: 40},
    {x: 91, y: 31},
    {x: 92, y: 22},
    {x: 93, y: 34},
    {x: 94, y: 29},
    {x: 95, y: 25},
    {x: 96, y: 36},
    {x: 97, y: 24},
    {x: 98, y: 37},
    {x: 99, y: 27},
    {x: 100, y: 39},
];

const x = (d: DataRecord) => d.x;
const y = (d: DataRecord) => d.y;

// Đoạn này là tooltip muốn thêm gì thì làm tương tự bên class chart
const triggers = {
    [Scatter.selectors.point]: (d: DataRecord) =>
        `<span>x :  ${d.x}<br/>y :  ${d.y}</span>`,
};

const DashboardPage = () => {
    // Giá trị mặc định ban đầu
    const [range, setRange] = React.useState<number>(20);
    // Data mặc định
    const [data, setData] = React.useState<DataRecord[]>(
        initialData.slice(0, range)
    );

    React.useEffect(() => {
        setData(initialData.slice(0, range));
    }, [range]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newRange = Number(e.target.value);
        if (newRange >= 1 && newRange <= 100) {
            setRange(newRange);
        }
    };

    return (
        <div className="flex justify-center">
            <div className="grid grid-rows-8 pt-[80px]">
                <div className="flex justify-center items-center text-4xl">
                    Student Analysis Graph
                </div>
                <div className="grid grid-cols-5 items-center">
                    <div className="col-span-1 flex flex-rows items-center w-[170px] gap-1.5">
                        <Label className="px-1 text-[16px]">Range</Label>
                        <Input
                            className=""
                            type="number"
                            min={1}
                            max={100}
                            value={range}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div className="col-span-3"></div>
                    <div className="col-span-1 flex justify-end">
                        <Link href="/admins/1/students/"></Link>
                    </div>
                </div>
                <div className="min-w-[1200px] min-h-[450px] row-span-6 pt-2">
                    <VisXYContainer className="min-h-[450px]" data={data}>
                        <VisAxis
                            gridLine={false}
                            tickTextFontSize="12px"
                            tickLine={true}
                            type="x"
                        ></VisAxis>
                        <VisAxis
                            gridLine={true}
                            tickTextFontSize="12px"
                            type="y"
                        ></VisAxis>
                        <VisLine x={x} y={y} />
                        <VisScatter x={x} y={y} color="#DA348F" />
                        <VisCrosshair
                            color={"cyan"}
                            strokeWidth={3}
                            strokeColor={"cyan"}
                        />
                        <VisTooltip triggers={triggers} />
                    </VisXYContainer>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;
