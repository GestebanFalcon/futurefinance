"use client"

import { MouseEventHandler, ReactNode } from "react"

/** Styled button component with optionss for class overwrites. Behaves almost exactly like a normal button */
export default function Button({ type, onClick, children, className }: {
    type?: "submit" | "reset" | "button",
    onClick?: MouseEventHandler<HTMLButtonElement>,
    children: ReactNode,
    className?: string //Allow for tailwind classNames for style overwrites
}) {
    return (
        <button onClick={onClick} type={type} className={`${className} mt-4 text-lg font-medium py-2 px-4 bg-emerald-400 hover:bg-emerald-600 transition-colors text-zinc-100 rounded-md`}>{children}</button>
    )
}