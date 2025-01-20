"use client";
import ProfileScreen from "@/app/pages/ProfileScreen";
import { useContext } from "react";
import { SidebarContext } from "@/app/context/SidebarContext";

export default function Page() {
    const { setIsSidebarOpen } = useContext(SidebarContext);
    return <ProfileScreen onMenuClick={() => setIsSidebarOpen(true)} />;
}
