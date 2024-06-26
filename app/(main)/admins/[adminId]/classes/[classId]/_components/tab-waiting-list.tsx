import React, {ReactElement} from "react";
import {TabsContent} from "@/components/ui/tabs";
import WaitingListTable from "./_waitingList_components/waiting-list-table";

const TabWaitingList = (): ReactElement => {
    return (
        <TabsContent value="waitingList">
            <WaitingListTable />
        </TabsContent>
    );
};

export default TabWaitingList;
