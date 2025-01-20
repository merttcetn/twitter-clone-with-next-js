"use client";
import HomeScreen from "./pages/HomeScreen";
import { useContext } from "react";
import { SidebarContext } from "./context/SidebarContext";

export default function Page() {
    const { setIsSidebarOpen } = useContext(SidebarContext);
    return <HomeScreen onMenuClick={() => setIsSidebarOpen(true)} />;
}
