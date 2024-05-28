import React, {ReactElement} from "react";
import {TabsContent} from "@/components/ui/tabs";
import OverviewCard from "./_overview-components/overview-card";
import ClassBasicInfomation from "./class-basic-information";
import {OutputType} from "@/lib/action/teacher/get-class-detail/types";

const TabOverview: React.FC<{data: OutputType | undefined}> = ({
    data,
}): ReactElement => {
    return (
        <TabsContent value="overview">
            <OverviewCard data={data} />
            <ClassBasicInfomation data={data} />
            {/* <ClassChart /> */}
        </TabsContent>
    );
};

export default TabOverview;
