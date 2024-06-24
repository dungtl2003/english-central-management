"use client";

import {UserProfile} from "@clerk/nextjs";
import {ReactElement, useEffect, useState} from "react";
import {IoInformationCircle} from "react-icons/io5";
import {IoArrowBackCircle} from "react-icons/io5";
import * as theme from "@clerk/themes";
import {PersonalInforPage} from "./personal-infor-page";
import {handler} from "@/lib/action/get-user-id";

const UserProfilePage = (): ReactElement => {
    const [userId, setUserId] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            await handler().then((value) => setUserId(value.data as string));
        };
        fetchData();
    }, []);

    return (
        <div className="flex justify-center">
            <UserProfile
                routing="hash"
                appearance={{
                    baseTheme: theme.dark,
                }}
            >
                <UserProfile.Page
                    label="Personal Information"
                    labelIcon={<IoInformationCircle size={18} />}
                    url="/personal-information"
                >
                    <PersonalInforPage userId={userId} />
                </UserProfile.Page>

                <UserProfile.Link
                    label="Back to site"
                    labelIcon={<IoArrowBackCircle size={18} />}
                    url="/"
                />
            </UserProfile>
        </div>
    );
};

export default UserProfilePage;
