import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import Link from "next/link";

export function BigLink({ label, href, Icon, pathname }: { label: string, href: string, Icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>, pathname: string }) {

    return (
        <Link className={`
        ${pathname === href ? "bg-emerald-50 text-emerald-600 hover:bg-emerald-100" : " text-zinc-800 hover:bg-zinc-200"} w-full flex flex-row items-center p-2 font-medium  transition-colors rounded-sm 
        `} href={href}>
            <Icon fontSize="small" className={`mr-2 text-zinc-600 ${pathname === href && "text-emerald-800"}`} />
            {label}
        </Link>
    )
}