"use client"

import { User } from "next-auth";
import { createContext, SetStateAction, useContext, useMemo, useState, Dispatch, ReactNode } from "react";

const UserContext = createContext<undefined | { user: User, setUser: Dispatch<SetStateAction<User>> }>(undefined);

export default function UserProvider({ initialUser, children }: { initialUser: User, children: ReactNode }) {
    const [user, setUser] = useState<User>(initialUser)
    const value = useMemo(() => ({
        user,
        setUser
    }), [])

    return (
        <UserContext.Provider value={value} >
            {children}
        </UserContext.Provider>
    )
}
export function useUser() {
    const context = useContext(UserContext);
    if (!context) throw new Error('useUser must be used within UserProvider!');
    return context;
}