import React, {ReactElement} from "react";
import {TabsContent} from "@/components/ui/tabs";
import OverviewCard from "./_overview-components/overview-card";
import {OutputType} from "@/lib/action/teacher/get-class-detail/types";
import ClassBasicInfomation from "./_overview-components/class-basic-information";
import {
    SkeletonClassBasicInformation,
    SkeletonOverviewCard,
} from "../../../_components/skeleton-teacher";

const TabOverview: React.FC<{
    data: OutputType | undefined;
    isLoading: boolean;
}> = ({data, isLoading}): ReactElement => {
    return (
        <TabsContent value="overview">
            {isLoading && <SkeletonOverviewCard />}
            {!isLoading && <OverviewCard data={data} />}
            {isLoading && <SkeletonClassBasicInformation />}
            {!isLoading && <ClassBasicInfomation data={data} />}

            {/* <ClassChart /> */}
        </TabsContent>
    );
};

export default TabOverview;
