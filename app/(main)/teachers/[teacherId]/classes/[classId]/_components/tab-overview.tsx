import React, {ReactElement} from "react";
import {TabsContent} from "@/components/ui/tabs";
import OverviewCard from "./_overview-components/overview-card";
import ClassBasicInfomation from "./class-basic-information";

const TabOverview = (): ReactElement => {
    return (
        <TabsContent value="overview">
            <OverviewCard />
            <ClassBasicInfomation />
            {/* <ClassChart /> */}
        </TabsContent>
    );
};

export default TabOverview;
