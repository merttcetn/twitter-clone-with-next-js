import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SidebarProvider } from "./context/SidebarContext";
import LeftSidebar from "./components/LeftSidebar";
import ReduxProvider from "./providers/ReduxProvider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "DogGO Task",
    description: "Case Study",
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <ReduxProvider>
                    <SidebarProvider>
                        <div className="flex bg-white min-h-screen text-black">
                            <LeftSidebar />
                            <main className="flex-1 md:ml-64 border-l border-gray-100">
                                {children}
                            </main>
                        </div>
                    </SidebarProvider>
                </ReduxProvider>
            </body>
        </html>
    );
}
