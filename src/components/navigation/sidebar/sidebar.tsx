"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import SettingsIcon from '@mui/icons-material/Settings';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { BigLink } from "./links";
import { roboto } from "@/fonts/fonts";

export default function Sidebar() {
    const pathname = usePathname()

    return (
        <aside className=" my-0 h-auto bg-zinc-100 shadow-lg w-56 relative z-10 p-8 flex flex-col items-center">

            <section className="mt-8 flex flex-col w-full items-start text-sm gap-1">
                <h3 className={`text-zinc-500 font-medium mb-1`}>USER</h3>


                <BigLink Icon={SettingsIcon} label="Settings" href="/app/settings" pathname={pathname} />
                <BigLink Icon={AssessmentIcon} label="Dashboard" href="/app/dashboard" pathname={pathname} />
            </section>


        </aside>
    )
}