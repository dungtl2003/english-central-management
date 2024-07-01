import React, {ReactElement, useCallback} from "react";
import {CurveType, NumericAccessor} from "@unovis/ts";
import {VisXYContainer, VisAxis, VisArea, VisBulletLegend} from "@unovis/react";
import {OutputType} from "@/lib/action/teacher/get-class-detail/types";
import {ClassChartData, Status, statuses} from "./types";
import {format} from "date-fns";
import {GoAlertFill} from "react-icons/go";
import {cn} from "@/lib/utils";

const formatData = (rawData: OutputType | undefined): ClassChartData[] => {
    const records: ClassChartData[] = [];
    if (!rawData) return records;

    rawData.sessions
        .filter((session) => session.attendedTime)
        .sort(
            (session1, session2) =>
                new Date(session1.actualStartTime!).getTime() -
                new Date(session2.actualStartTime!).getTime()
        )
        .forEach((session) => {
            const presents = session.attendances.filter(
                (attendance) => attendance.status === "PRESENT"
            ).length;
            const absents = session.attendances.filter(
                (attendance) => attendance.status === "ABSENT"
            ).length;
            const lates = session.attendances.filter(
                (attendance) => attendance.status === "LATE"
            ).length;

            records.push({
                dateTime: `${format(session.actualStartTime!, "dd/MM/yyyy")}\n${format(session.actualStartTime!, "HH:mm:ss")}`,
                cases: {
                    pr: presents,
                    la: lates,
                    ab: absents,
                },
            });
        });

    return records;
};

const ClassChart: React.FC<{rawData: OutputType | undefined}> = ({
    rawData,
}): ReactElement => {
    const data = formatData(rawData);
    const x = useCallback((_: ClassChartData, i: number) => i, []);

    const Accessors = (
        id: Status
    ): {y: NumericAccessor<ClassChartData>; color: string | undefined} => ({
        y: useCallback((d: ClassChartData) => d.cases[id], [id]),
        color: statuses[id].color,
    });

    const xTicks = useCallback(
        (i: number | Date) => data[parseInt(i.toString())].dateTime,
        [data]
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

    const className =
        data.length < 10
            ? cn(
                  "flex justify-center items-center h-[100%] text-4xl pt-10 mt-20"
              )
            : cn("w-full p-0 pt-5 px-2 m-0 text-black");

    return (
        <div className={className}>
            {data.length < 10 ? (
                <>
                    <span className="flex items-center pr-2">
                        <GoAlertFill color="yellow" />
                    </span>{" "}
                    <span className="text-cyan">
                        Not enough data to display
                    </span>{" "}
                    <span className="flex items-center pl-2">
                        <GoAlertFill color="yellow" />
                    </span>
                </>
            ) : (
                <VisXYContainer
                    data={data}
                    height="280px"
                    className="custom-area"
                >
                    <VisBulletLegend
                        className="flex items-center justify-center"
                        items={Object.values(statuses)}
                    />
                    <VisArea
                        minHeight1Px={true}
                        {...Accessors(Status.Absent)}
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
                        {...Accessors(Status.Present)}
                        x={x}
                        curveType={CurveType.Basis}
                    />
                    <VisAxis type="x" gridLine={false} tickFormat={xTicks} />
                    <VisAxis type="y" tickFormat={yTicks} />
                </VisXYContainer>
            )}
        </div>
    );
};

export default ClassChart;
