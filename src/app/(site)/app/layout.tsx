import Sidebar from "@/components/navigation/sidebar/sidebar";
import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="flex-grow flex flex-row w-full">
            <Sidebar />
            {children}
        </div>
    )
}