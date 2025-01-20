"use client";
import ExploreScreen from "@/app/pages/ExploreScreen";
import { useContext } from "react";
import { SidebarContext } from "@/app/context/SidebarContext";

export default function Page() {
    const { setIsSidebarOpen } = useContext(SidebarContext);
    return <ExploreScreen onMenuClick={() => setIsSidebarOpen(true)} />;
}
