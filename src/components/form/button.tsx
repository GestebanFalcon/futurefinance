"use client"

import { Roboto } from "next/font/google"
import { MouseEventHandler, ReactNode } from "react"

const roboto = Roboto({
    weight: ["300", "400", "500", "700", "900"],
    subsets: ['latin']

})

/** Styled button component with optionss for class overwrites. Behaves almost exactly like a normal button */
export default function Button({ type, onClick, children, className, isCaps }: {
    isCaps?: boolean,
    type?: "submit" | "reset" | "button",
    onClick?: MouseEventHandler<HTMLButtonElement>,
    children: ReactNode,
    className?: string //Allow for tailwind classNames for style overwrites
}) {

    return (
        <button onClick={onClick} type={type} className={`${className} text-lg ${isCaps && roboto.className} font-medium text-base py-2 px-6 bg-emerald-500 hover:bg-emerald-700 transition-colors text-zinc-100 rounded-md shadow-md`}>
            {!isCaps ? children : (
                children?.toString().toUpperCase()
            )}
        </button>
    )
}