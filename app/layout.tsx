import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import {ClerkProvider} from "@clerk/nextjs";
import {ThemeProvider} from "next-themes";
import {Theme} from "@radix-ui/themes";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
    title: "ECM Center",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <ThemeProvider attribute="class">
                    <Theme
                        accentColor="mint"
                        hasBackground
                        panelBackground="solid"
                        scaling="100%"
                        radius="full"
                        grayColor="gray"
                    >
                        <ClerkProvider>{children}</ClerkProvider>
                    </Theme>
                </ThemeProvider>
            </body>
        </html>
    );
}
