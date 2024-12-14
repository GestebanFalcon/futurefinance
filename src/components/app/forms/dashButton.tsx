"use client"
import { MouseEventHandler, ReactNode } from "react"
import { roboto } from "@/fonts/fonts"

/** Minimally styled, smaller button component to fit in dashboard */
export default function DashButton({ type, onClick, children, className, isCaps, disabled }: {
    isCaps?: boolean,
    type?: "submit" | "reset" | "button",
    onClick?: MouseEventHandler<HTMLButtonElement>,
    children: ReactNode,
    className?: string //Allow for tailwind classNames for style overwrites
    disabled?: boolean
}) {

    return (
        <button disabled={disabled} onClick={onClick} type={type} className={`${className} ${isCaps && roboto.className}
            py-0.5
            px-4
            text-sm
            border-2
            rounded-sm
            shadow-sm
        `}>
            {!isCaps ? children : (
                children?.toString().toUpperCase()
            )}
        </button>
    )
}