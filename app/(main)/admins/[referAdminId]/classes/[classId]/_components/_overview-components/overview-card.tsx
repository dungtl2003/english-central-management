import React, {ReactElement} from "react";
import {Card, CardContent} from "@/components/ui/card";
import {PiStudentFill} from "react-icons/pi";
import {GrInProgress} from "react-icons/gr";
import {LuGoal} from "react-icons/lu";
import {HiOutlineCurrencyDollar} from "react-icons/hi2";

const OverviewCard = (): ReactElement => {
    return (
        <div className="pt-3 flex flex-row">
            <div className="min-w-full grid grid-cols-4 gap-x-5">
                <Card>
                    <CardContent>
                        <div className="grid grid-cols-3">
                            <div className="flex justify-center items-center">
                                <PiStudentFill size={60} />
                            </div>
                            <div className="grid col-span-2 grid-rows-2">
                                <div className="flex justify-center items-center">
                                    Number of students
                                </div>
                                <div className="text-4xl row-span-2 flex justify-center items-center">
                                    45
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <div className="grid grid-cols-3">
                            <div className="flex justify-center items-center">
                                <GrInProgress size={50} />
                            </div>
                            <div className="grid col-span-2 grid-rows-2">
                                <div className="flex justify-center items-center">
                                    Class progress
                                </div>
                                <div className="text-4xl row-span-2 flex justify-center items-center">
                                    27
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <div className="grid grid-cols-3">
                            <div className="flex justify-center items-center">
                                <LuGoal size={55} />
                            </div>
                            <div className="grid col-span-2 grid-rows-2">
                                <div className="flex justify-center items-center">
                                    Class goal
                                </div>
                                <div className="text-4xl row-span-2 flex justify-center items-center">
                                    50
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        <div className="grid grid-cols-3">
                            <div className="flex justify-center items-center">
                                <HiOutlineCurrencyDollar size={60} />
                            </div>
                            <div className="grid col-span-2 grid-rows-2">
                                <div className="flex justify-center items-center">
                                    Price per session
                                </div>
                                <div className="text-4xl row-span-2 flex justify-center items-center">
                                    7$
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default OverviewCard;
