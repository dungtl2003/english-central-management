import React, {ReactElement} from "react";
import UserButton from "@/components/user-button";
import Logo from "@/components/logo";
import Link from "next/link";
import {ThemeToggle} from "@/components/mode-toggle";

import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {OutputType} from "@/lib/action/teacher/get-teacher-detail/types";
import {parse} from "date-fns";
import {roundUp} from "@/lib/utils";

const TeacherNavigation: React.FC<{data: OutputType | undefined}> = ({
    data,
}): ReactElement => {
    const acceptedDate =
        data && data.acceptedAt ? data!.acceptedAt!.toString() : null;
    const seniority: number = acceptedDate
        ? new Date().getFullYear() -
          parse(acceptedDate, "dd/MM/yyyy", new Date()).getFullYear()
        : 0;

    return (
        <div>
            <NavigationMenu className="bg-white dark:bg-black fixed w-full h-16 p-4 border-b shadow-sm flex items-center">
                <div className="w-full">
                    <NavigationMenuList>
                        <NavigationMenuItem className="mr-auto flex items-center gap-x-4">
                            <Logo />
                            <Link
                                className="mr-auto flex gap-x-2"
                                href="/"
                                legacyBehavior
                                passHref
                            >
                                <NavigationMenuLink
                                    className={
                                        navigationMenuTriggerStyle() +
                                        " rounded-md border border-slate-200 dark:border-slate-800"
                                    }
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth="1.5"
                                        stroke="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                        />
                                    </svg>
                                </NavigationMenuLink>
                            </Link>

                            <Link
                                className="mr-auto flex gap-x-2"
                                href="/"
                                legacyBehavior
                                passHref
                            >
                                <NavigationMenuLink
                                    className={
                                        navigationMenuTriggerStyle() +
                                        " rounded-md border border-slate-200 dark:border-slate-800"
                                    }
                                >
                                    Manage classes
                                </NavigationMenuLink>
                            </Link>
                        </NavigationMenuItem>
                        <NavigationMenuItem className="ml-auto flex items-center gap-x-4">
                            <NavigationMenuLink
                                className={
                                    navigationMenuTriggerStyle() +
                                    " rounded-md border border-slate-200 dark:border-slate-800"
                                }
                            >
                                {`Salary: $${data ? roundUp(Number(data.baseSalary) * (1 + seniority / 10), 2) : 0} / month`}
                            </NavigationMenuLink>
                            <ThemeToggle />
                            <UserButton />
                        </NavigationMenuItem>
                    </NavigationMenuList>
                </div>
            </NavigationMenu>
        </div>
    );
};

export default TeacherNavigation;
