"use client";
import BookmarksScreen from "@/app/pages/BookmarksScreen";
import { useContext } from "react";
import { SidebarContext } from "@/app/context/SidebarContext";

export default function Page() {
    const { setIsSidebarOpen } = useContext(SidebarContext);
    return <BookmarksScreen onMenuClick={() => setIsSidebarOpen(true)} />;
}
