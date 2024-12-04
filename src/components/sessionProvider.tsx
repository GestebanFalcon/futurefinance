"use client"

import { Session } from "next-auth"
import { createContext, ReactNode, useContext } from "react"

const SessionContext = createContext<Session | null | undefined>(undefined);

/** Global react context provider to share session across client/session component boundary */
export default function SessionProvider({ session, children }: { session: Session | null, children: ReactNode }) {



    return (
        <SessionContext.Provider value={session}>
            {children}
        </SessionContext.Provider>
    )

}

/** Globally accessible session context solution so that the server-side session callbacks are not called so frequently */
export function useSession() {
    const context = useContext(SessionContext);
    if (context === undefined) {
        throw new Error('useSession must be used within a SessionProvider');
    }
    return context;
}


// I made this but I really dont know if I'm going to use it. It doesn't seem to be working. It also will not work from the server, which destroys the whole point.