"use client";

import {PublicMetadata} from "@/constaints";
import {UserProfile, useUser} from "@clerk/nextjs";
import * as theme from "@clerk/themes";

//custom page ở đây nhé
const CustomPage = () => {
    const {user} = useUser();
    const personalInformation: PublicMetadata | undefined =
        user?.publicMetadata;

    return (
        <div className="container mx-auto">
            <div className="flex">
                <div className="ml-4">
                    <div className="-mx-4 overflow-x-auto px-4 py-4 sm:-mx-8 sm:px-8">
                        <div className="inline-block w-full overflow-hidden rounded-lg shadow-md">
                            <table className="w-full leading-normal">
                                <tbody>
                                    <tr>
                                        <td className="whitespace-no-wrap border-b border-gray-200 bg-white px-5 py-5 text-sm text-gray-900">
                                            First Name
                                        </td>
                                        <td className="whitespace-no-wrap border-b border-gray-200 bg-white px-5 py-5 text-sm text-gray-900">
                                            {user?.firstName}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="whitespace-no-wrap border-b border-gray-200 bg-white px-5 py-5 text-sm text-gray-900">
                                            Last Name
                                        </td>
                                        <td className="whitespace-no-wrap border-b border-gray-200 bg-white px-5 py-5 text-sm text-gray-900">
                                            {user?.lastName}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="whitespace-no-wrap border-b border-gray-200 bg-white px-5 py-5 text-sm text-gray-900">
                                            Emails
                                        </td>
                                        <td className="whitespace-no-wrap border-b border-gray-200 bg-white px-5 py-5 text-sm text-gray-900">
                                            {user?.emailAddresses.map(
                                                (email) => (
                                                    <div
                                                        key={email.emailAddress}
                                                    >
                                                        {email.emailAddress},{" "}
                                                    </div>
                                                )
                                            )}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td className="whitespace-no-wrap border-b border-gray-200 bg-white px-5 py-5 text-sm text-gray-900">
                                            Role
                                        </td>
                                        <td className="whitespace-no-wrap border-b border-gray-200 bg-white px-5 py-5 text-sm text-gray-900">
                                            {personalInformation?.role}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="flex justify-center">
                        <button className="mt-4 bg-purple-600 px-4 py-2 font-bold text-white transition-all hover:bg-purple-800">
                            Update
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

//Hàm này để tạo label icon, sửa theo ý thích nhé
const DotIcon = () => {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            fill="currentColor"
        >
            <path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512z" />
        </svg>
    );
};

const UserProfilePage = () => (
    <div className="flex justify-center">
        <UserProfile
            routing="hash"
            appearance={{
                baseTheme: theme.dark, //đổi theme, để mặc định thì xoá đi
            }}
        >
            <UserProfile.Page
                label="Personal Information"
                labelIcon={<DotIcon />}
                url="/personal-information"
            >
                <CustomPage />
            </UserProfile.Page>
        </UserProfile>
    </div>
);

export default UserProfilePage;
