import { ReactNode } from "react";

export default function Container({ children }: { children: ReactNode }) {
    return (
        <section className=" bg-zinc-200 flex flex-col items-center w-[28rem] rounded-sm mt-12 px-20 py-16 gap-4">
            {children}
        </section>
    )
}