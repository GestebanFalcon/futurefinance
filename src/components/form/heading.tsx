import { ReactNode } from "react";

export default function Heading({ children }: { children: ReactNode }) {
    return (
        <h1 className="font-semibold text-2xl mb-4">{children}</h1>
    )
}