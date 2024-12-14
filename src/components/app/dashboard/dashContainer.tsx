import { ReactNode } from "react";

export default function DashContainer({ children, className }: { children: ReactNode, className?: string }) {
    return (
        <section className={`${className} flex flex-col items-start px-16 py-12 w-128 bg-zinc-100 shadow-sm gap-5 font-semibold`}>
            {children}
        </section>
    )
}