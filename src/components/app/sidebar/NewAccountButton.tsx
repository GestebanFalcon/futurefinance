"use client"
import BankAccountForm from "@/components/app/bankAccountForm";
import { useBankAccounts } from "@/components/app/context/bankAccountsProvider";
import { SelectBankAccount } from "@/lib/drizzy/schema/other";
import { Add } from "@mui/icons-material";
import { Dialog } from "@mui/material";
import { useState } from "react";

export default function NewAccountButton() {
    const [showForm, setShowForm] = useState(false);
    const { bankAccounts, setBankAccounts } = useBankAccounts();

    const handleSuccess = (bankAccount: SelectBankAccount) => {
        const newBankAccounts = ([...bankAccounts, bankAccount]);
        setBankAccounts(newBankAccounts);
        setShowForm(false);
    }

    return (
        <>
            <button className={`
                text-zinc-400 
                hover:bg-zinc-200 w-full
                hover:text-zinc-600
                transition-colors
                rounded-lg
                text-xs
                font-medium
                py-0.5
                flex
                flex-row
                items-center
                justify-start
                pl-2
                

            `}
                onClick={(e) => { setShowForm(true) }}
            >
                <Add className="mr-4" fontSize="small" />
                CREATE NEW
            </button>


            <Dialog open={showForm} onClose={() => { setShowForm(false) }}>
                <BankAccountForm handleSuccess={handleSuccess} />
            </Dialog>

        </>
    )
}