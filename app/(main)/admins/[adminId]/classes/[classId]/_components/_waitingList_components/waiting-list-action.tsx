import {Button} from "@/components/ui/button";
import React, {ReactElement} from "react";

const WaitingListAction: React.FC = (): ReactElement => {
    return (
        <>
            <div className="flex gap-x-3 justify-center">
                <Button variant="success">Accept</Button>
                <Button variant="destructive">Reject</Button>
            </div>
        </>
    );
};

export default WaitingListAction;
