"use client";
import ProfileScreen from "@/app/pages/ProfileScreen";
import { useContext } from "react";
import { SidebarContext } from "@/app/context/SidebarContext";
import { useParams } from "next/navigation";

export default function Page() {
    const { setIsSidebarOpen } = useContext(SidebarContext);
    const { username } = useParams();

    return (
        <ProfileScreen
            username={username as string}
            onMenuClick={() => setIsSidebarOpen(true)}
        />
    );
}
