"use client"

import { SelectBankAccount } from "@/lib/drizzy/schema/other";
import { createContext, SetStateAction, useContext, useMemo, useState, Dispatch, ReactNode } from "react";

const BankAccountContext = createContext<undefined | { bankAccounts: SelectBankAccount[], setBankAccounts: Dispatch<SetStateAction<SelectBankAccount[]>> }>(undefined);

export default function BankAccountsProvider({ initialBankAccounts, children }: { initialBankAccounts: SelectBankAccount[], children: ReactNode }) {
    const [bankAccounts, setBankAccounts] = useState<SelectBankAccount[]>(initialBankAccounts)
    const value = useMemo(() => ({
        bankAccounts,
        setBankAccounts
    }), [bankAccounts]);

    return (
        <BankAccountContext.Provider value={value} >
            {children}
        </BankAccountContext.Provider>
    )
}
export function useBankAccounts() {
    const context = useContext(BankAccountContext)
    if (!context) throw new Error('useBankAccount must be used within BankAccountProvider!')
    return context
}   