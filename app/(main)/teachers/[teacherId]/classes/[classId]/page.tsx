import {Card, CardContent} from "@/components/ui/card";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import React, {ReactElement} from "react";
import ClassHeader from "./_components/class-header";

const page = (): ReactElement => {
    return (
        <div className="flex justify-center">
            <div className="w-10/12 pt-[110px]">
                <ClassHeader />
                <Tabs defaultValue="overview" className="mt-[30px] w-full">
                    <TabsList>
                        <TabsTrigger value="overview">Overview</TabsTrigger>
                        <TabsTrigger value="classList">Class list</TabsTrigger>
                        <TabsTrigger value="classAttendance">
                            Attendance
                        </TabsTrigger>
                    </TabsList>
                    <TabsContent value="overview">
                        <Card className="font-mono flex align-middle">
                            <CardContent className="space-y-2 align-middle">
                                haha
                            </CardContent>
                        </Card>
                        <Card className="font-mono">
                            <CardContent className="space-y-2">
                                hihi
                            </CardContent>
                        </Card>
                    </TabsContent>
                    <TabsContent value="classList">
                        This is class detail list
                    </TabsContent>
                    <TabsContent value="classAttendance">
                        This is class attendance
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default page;
