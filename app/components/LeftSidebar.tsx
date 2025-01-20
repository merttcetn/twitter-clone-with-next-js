"use client";
import Link from "next/link";
import { useEffect, useContext } from "react";
import { SidebarContext } from "../context/SidebarContext";
import { MY_PROFILE } from "../pages/ProfileScreen";
import { usePathname } from "next/navigation";

export default function LeftSidebar() {
    const { isSidebarOpen, setIsSidebarOpen } = useContext(SidebarContext);
    const pathname = usePathname();

    // ESC tuşu ile sidebar'ı kapatma
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setIsSidebarOpen(false);
            }
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [setIsSidebarOpen]);

    return (
        <>
            {/* Overlay */}
            {isSidebarOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div
                className={`
                fixed top-0 left-0 h-screen bg-white z-50
                transform transition-transform duration-300 ease-in-out
                w-72 md:w-64 md:translate-x-0
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
                border-r border-gray-100 p-6 flex flex-col justify-between
            `}
            >
                <div className="space-y-1">
                    {/* Mobil görünümdeki toggle butonu */}
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="md:hidden absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    <Link
                        href="/"
                        prefetch={true}
                        className={`flex items-center space-x-6 p-4 hover:bg-gray-50 rounded-xl ${
                            pathname === "/"
                                ? "font-bold text-black"
                                : "text-gray-500"
                        }`}
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M9.02 2.84004L3.63 7.04004C2.73 7.74004 2 9.23004 2 10.36V17.77C2 20.09 3.89 21.99 6.21 21.99H17.79C20.11 21.99 22 20.09 22 17.78V10.5C22 9.29004 21.19 7.74004 20.2 7.05004L14.02 2.72004C12.62 1.74004 10.37 1.79004 9.02 2.84004Z"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span className="text-[17px]">Home</span>
                    </Link>

                    <Link
                        href="/explore"
                        prefetch={true}
                        className={`flex items-center space-x-6 p-4 hover:bg-gray-50 rounded-xl ${
                            pathname === "/explore"
                                ? "font-bold text-black"
                                : "text-gray-500"
                        }`}
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M2 8.99999H22M6 16H18"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            />
                        </svg>
                        <span className="text-[17px]">Explore</span>
                    </Link>

                    <Link
                        href="/bookmarks"
                        prefetch={true}
                        className={`flex items-center space-x-6 p-4 hover:bg-gray-50 rounded-xl ${
                            pathname === "/bookmarks"
                                ? "font-bold text-black"
                                : "text-gray-500"
                        }`}
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M17 3H7C5.9 3 5 3.9 5 5V21L12 18L19 21V5C19 3.9 18.1 3 17 3Z"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span className="text-[17px]">Bookmarks</span>
                    </Link>

                    <Link
                        href="/profile"
                        prefetch={true}
                        className={`flex items-center space-x-6 p-4 hover:bg-gray-50 rounded-xl ${
                            pathname === "/profile"
                                ? "font-bold text-black"
                                : "text-gray-500"
                        }`}
                    >
                        <svg
                            width="24"
                            height="24"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M12 12C14.7614 12 17 9.76142 17 7C17 4.23858 14.7614 2 12 2C9.23858 2 7 4.23858 7 7C7 9.76142 9.23858 12 12 12Z"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                            <path
                                d="M20.5899 22C20.5899 18.13 16.7399 15 11.9999 15C7.25991 15 3.40991 18.13 3.40991 22"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />
                        </svg>
                        <span className="text-[17px]">Profile</span>
                    </Link>
                </div>

                {/* New Post butonu */}
                <div className="mb-8">
                    <Link href="/">
                        <button className="w-full py-4 bg-[#FF7452] hover:bg-[#FF5C33] text-white rounded-full text-[17px] font-medium transition-colors duration-200">
                            New Post
                        </button>
                    </Link>
                </div>

                {/* Profil bölümü */}
                <Link
                    href="/profile"
                    className="flex items-center space-x-3 p-4 hover:bg-gray-50 rounded-xl"
                >
                    <div className="w-10 h-10 rounded-full bg-gray-200" />
                    <div>
                        <p className="font-medium text-sm">{MY_PROFILE.name}</p>
                        <p className="text-gray-500 text-sm">
                            @{MY_PROFILE.username}
                        </p>
                    </div>
                </Link>
            </div>
        </>
    );
}
