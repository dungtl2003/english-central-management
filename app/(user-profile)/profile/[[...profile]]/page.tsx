import React, {ReactElement} from "react";
import {UserProfile} from "@clerk/nextjs";

const ProfilePage = (): ReactElement => {
    return (
        <div className="flex justify-center">
            <UserProfile />
        </div>
    );
};

export default ProfilePage;
