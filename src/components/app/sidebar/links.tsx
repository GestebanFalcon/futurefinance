import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import Link from "next/link";

export function BigLink({ label, href, Icon, pathname }: { label: string, href: string, Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>, pathname: string }) {

    return (
        <Link
            className={`
        ${pathname === href ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100" : " text-zinc-800 hover:bg-zinc-200"} w-full flex flex-row items-center p-2 font-semibold  transition-colors rounded-sm 
        `}
            href={href}>
            <Icon fontSize="small" className={`mr-2 text-zinc-600 ${pathname === href && "text-emerald-900"}`} />
            {label}
        </Link>
    )
}

export function AccountLink({ label, accountId, currentAccountId }: { label: string, accountId: string, currentAccountId?: string }) {
    return (
        <Link
            className={`
                ${accountId === currentAccountId ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100" : " text-zinc-700 hover:bg-zinc-200"}
                w-full
                rounded-lg
                text-sm
                font-medium
            `}
            href={`/app/dashboard/${accountId}`}
        >
            <div className={`${accountId === currentAccountId ? "border-l-emerald-800" : "border-l-zinc-400"} border-l-2 border-l-emerald-800 ml-[17px] pl-8 py-0.5`}>
                {label}
            </div>
        </Link>
    )
}