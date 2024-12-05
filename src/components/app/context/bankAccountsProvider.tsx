"use client"

import { SelectBankAccount } from "@/lib/drizzy/schema/other";
import { useParams } from "next/navigation";
import { createContext, SetStateAction, useContext, useMemo, useState, Dispatch, ReactNode, useEffect } from "react";

const BankAccountContext = createContext<undefined | {
    bankAccounts: SelectBankAccount[],
    setBankAccounts: Dispatch<SetStateAction<SelectBankAccount[]>>,
    bankAccount: SelectBankAccount | undefined,
    setBankAccount: Dispatch<SetStateAction<SelectBankAccount | undefined>>

}>(undefined);

export default function BankAccountsProvider({ initialBankAccounts, children }: { initialBankAccounts: SelectBankAccount[], children: ReactNode }) {
    const [bankAccounts, setBankAccounts] = useState<SelectBankAccount[]>(initialBankAccounts)


    const params = useParams();
    const id = params.id;

    const account = useMemo(() => bankAccounts.find((account) => (id === account.id)), [bankAccounts]);

    const [bankAccount, setBankAccount] = useState(account);

    useEffect(() => {
        setBankAccount(account);
    }, [account])

    //not performant but can be fixed later
    const value = useMemo(() => ({
        bankAccounts,
        setBankAccounts,
        bankAccount,
        setBankAccount
    }), [bankAccounts, bankAccount]);

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