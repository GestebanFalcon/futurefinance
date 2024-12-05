"use client"
import { ChangeEventHandler, ReactNode } from "react";

export default function DashSelect({ children, label, value, onChange }: { children: ReactNode, label: string, value?: string, onChange?: ChangeEventHandler<HTMLSelectElement> }) {
    return (
        <div className="w-full">
            <h3 className="text-neutral-500 ml-1 text-xs mb-2 font-bold">{label}</h3>
            <select value={value} onChange={onChange} className="
                
                py-1.5

                px-2

                w-full
                text-sm
                font-semibold
                border-zinc-400
                border-[1px]
                
                focus:outline-none

                rounded-sm

            ">
                {children}
            </select>
        </div>
    )
}