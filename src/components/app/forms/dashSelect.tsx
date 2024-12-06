"use client"
import { ChangeEventHandler, ReactNode } from "react";

export default function DashSelect({ children, label, value, onChange, disabled }: { children: ReactNode, label: string, value?: string | number | readonly string[], onChange?: ChangeEventHandler<HTMLSelectElement>, disabled?: boolean }) {
    return (
        <div className="w-full">
            <h3 className="text-neutral-500 ml-1 text-xs mb-2 font-bold">{label}</h3>
            <select value={value} onChange={onChange} disabled={disabled} className={`
                ${disabled && "bg-zinc-200 text-neutral-700 font-medium"}

                bg-white
                focus:bg-emerald-50

                py-1.5

                px-2

                w-full
                text-sm
                font-semibold
                border-zinc-400
                border-[1px]
                
                focus:outline-none

                rounded-sm

            `}>
                {children}
            </select>
        </div>
    )
}