"use client"
import { useBankAccounts } from "@/components/app/context/bankAccountsProvider";
import AccountBar from "@/components/app/dashboard/accountBar";
import ChartSpace from "@/components/app/dashboard/charts/chartSpace";
import FilterBar from "@/components/app/dashboard/charts/filterBar";
import LoadingSkeleton from "@/components/app/dashboard/loadingSkeleton";
import TransactionForm from "@/components/app/forms/transactionForm";
import Skeleton from "@/components/util/skeleton";
import { SelectBankAccount, SelectTransaction } from "@/lib/drizzy/schema/other";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useMemo, useState } from "react";



export default function Page() {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | undefined>(undefined)
    const { bankAccounts, setBankAccounts, bankAccount } = useBankAccounts();
    const [transactions, setTransactions] = useState<SelectTransaction[]>([]);
    const router = useRouter();


    useEffect(() => {
        if (!bankAccount) {
            router.push("/app/dashboard");
        }
        setIsLoading(true);
        const fetchTransactions = async () => {
            try {
                const res = await fetch(`/api/bankAccount/${bankAccount?.id || "null"}/getTransactions`);
                const body = await res.json();
                if (body.error) {
                    setError(error)
                }
                if (body.transactions) {
                    setTransactions(body.transactions);
                }
            } catch (err) {
                console.error(err);
                setError("Something went wrong");
                throw err;
            }


            setIsLoading(false);
        }
        fetchTransactions();

    }, [])


    return (

        <div className="p-8 flex flex-row w-full gap-8">
            {error ? <p>{error}</p> : (
                <>

                    {(isLoading || !bankAccount) ? (<LoadingSkeleton />) : (
                        <>
                            {transactions.map((transaction) => (<p>{transaction.value}</p>))}
                            <div className="flex flex-col h-full gap-8 mb-8 ">

                                <AccountBar />

                                <TransactionForm setTransactions={setTransactions} transactions={transactions} />

                            </div>
                            <ChartSpace />

                        </>
                    )}
                </>
            )}
        </div>
    )
}