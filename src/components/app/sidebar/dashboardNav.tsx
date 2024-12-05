"use client"
import { useBankAccounts } from "@/components/app/context/bankAccountsProvider";
import { useParams } from "next/navigation";
import { AccountLink } from "./links";
import NewAccountButton from "./NewAccountButton";

export function DashboardNav() {
    const { bankAccounts } = useBankAccounts()

    const params = useParams();

    const idParam = params.id;
    const currentAccountId = (idParam instanceof Array ? undefined : idParam);

    return (
        <section className="mt-0 flex flex-col w-full items-start text-sm gap-0 transition-all">
            {
                bankAccounts.map(bankAccount => (
                    <AccountLink label={bankAccount.name} accountId={bankAccount.id} key={bankAccount.id} currentAccountId={currentAccountId} />
                ))
            }
            <NewAccountButton />
        </section>
    )
}