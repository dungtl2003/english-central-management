"use client";

import {ReactElement} from "react";
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

const TeachersLayout: React.FC<{children: React.ReactNode}> = ({
    children,
}): ReactElement => {
    return (
        <>
            <div>
                <NavigationMenu className="fixed w-full h-16 p-4 border-b shadow-sm flex items-center">
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
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            className="w-5 h-5"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                                            />
                                        </svg>
                                    </NavigationMenuLink>
                                </Link>

                                <Link
                                    className="mr-auto flex gap-x-2"
                                    href="#"
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

                                <Link
                                    className="mr-auto flex gap-x-2"
                                    href="#"
                                    legacyBehavior
                                    passHref
                                >
                                    <NavigationMenuLink
                                        className={
                                            navigationMenuTriggerStyle() +
                                            " rounded-md border border-slate-200 dark:border-slate-800"
                                        }
                                    >
                                        Manage profile
                                    </NavigationMenuLink>
                                </Link>
                            </NavigationMenuItem>
                            <NavigationMenuItem className="ml-auto flex items-center gap-x-4">
                                <Link href="#" legacyBehavior passHref>
                                    <NavigationMenuLink
                                        className={
                                            navigationMenuTriggerStyle() +
                                            " rounded-md border border-slate-200 dark:border-slate-800"
                                        }
                                    >
                                        {"Salary: $150 / class"}
                                    </NavigationMenuLink>
                                </Link>
                                <ThemeToggle />
                                {/* <div>
                                    <a href="/sign-in">Sign in</a> /{" "}
                                    <a href="/sign-up">Sign up</a>
                                </div> */}
                                <UserButton />
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </div>
                </NavigationMenu>
            </div>
            {children}
        </>
    );
};

export default TeachersLayout;
