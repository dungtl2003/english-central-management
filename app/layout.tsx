import type {Metadata} from "next";
import {Inter as FontSans} from "next/font/google";
import "./globals.css";
import {ClerkProvider} from "@clerk/nextjs";
import {cn} from "@/lib/utils";
import {ThemeProvider} from "@/components/theme-provider";
import {Toaster} from "@/components/ui/toaster";
import NextTopLoader from "nextjs-toploader";

const fontSans = FontSans({
    subsets: ["latin"],
    variable: "--font-sans",
});
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
            <body
                className={cn(
                    "min-h-screen bg-background font-sans antialiased dark:bg-black",
                    fontSans.variable
                )}
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <ClerkProvider>
                        <NextTopLoader color="#2ecc71" showSpinner={false} />
                        <main>{children}</main>
                        <Toaster />
                    </ClerkProvider>
                </ThemeProvider>
            </body>
        </html>
    );
}
