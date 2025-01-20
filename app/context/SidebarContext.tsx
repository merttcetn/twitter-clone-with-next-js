"use client";
import { createContext, useState, ReactNode } from "react";

interface SidebarContextType {
    isSidebarOpen: boolean;
    setIsSidebarOpen: (isOpen: boolean) => void;
}

export const SidebarContext = createContext<SidebarContextType>({
    isSidebarOpen: false,
    setIsSidebarOpen: () => {},
});

export function SidebarProvider({ children }: { children: ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    return (
        <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
            {children}
        </SidebarContext.Provider>
    );
}
