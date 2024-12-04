import { ReactNode } from "react";

export default function Container({ children, className, noMargin }: { children: ReactNode, className?: string, noMargin?: boolean }) {
    return (
        <section className={` bg-zinc-200 flex flex-col items-center w-[28rem] rounded-sm ${!noMargin && "mt-12"} px-20 py-16 gap-4 ${className}`}>
            {children}
        </section>
    )
}