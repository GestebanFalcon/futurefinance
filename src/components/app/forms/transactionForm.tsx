"use client"

import DashField from "./dashField";
import DashContainer from "../dashboard/dashContainer";
import DashSelect from "./dashSelect";
import { InsertTransaction, SelectTransaction } from "@/lib/drizzy/schema/other";
import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import DashButton from "./dashButton";
import { useBankAccounts } from "../context/bankAccountsProvider";
import dayjs, { Dayjs } from "dayjs"
import createTransaction from "@/actions/createTransaction";
import ErrorIcon from '@mui/icons-material/Error';

export default function TransactionForm({ setTransactions, transactions }: { setTransactions: Dispatch<SetStateAction<SelectTransaction[]>>, transactions: SelectTransaction[] }) {

    const [error, setError] = useState<undefined | string>();
    const { bankAccount, bankAccounts } = useBankAccounts();



    const [data, setData] = useState({
        source: "",
        value: "",
        category: "other",
        date: dayjs(),
        bankAccountId: bankAccount?.id || "",
        isExpense: 1

    });

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const transaction = { ...data, date: data.date.toDate(), value: parseFloat(data.value) * 100 * data.isExpense }
        try {
            const res = await createTransaction(transaction);
            if (res.transaction) {
                setTransactions([...transactions, res.transaction]);
            }
            if (res.error) {
                setError(res.error);
            }

        } catch (err) {
            setError("Something went wrong");
            throw err;
        }
    }

    return (
        <DashContainer className="flex-grow flex flex-col">
            <h1 className="text-xl">Add Transaction</h1>
            <form className="flex flex-col gap-2" onSubmit={handleSubmit}>
                <span className="flex gap-2 flex-row">
                    <DashField value={data.source} onChange={e => { setData({ ...data, source: e.target.value }) }} label="Source" />
                    <DashField value={data.value} onChange={e => { setData({ ...data, value: !isNaN(Number(e.target.value)) || !e.target.value ? e.target.value : data.value }) }} label="Value ($)" />
                </span>
                <span className="flex gap-2 flex-row">
                    <DashSelect label="Category" value={data.category} onChange={(e) => { setData({ ...data, category: e.target.value }) }}>
                        <option value="other">Other</option>
                        <option value="muzz">The Muzz</option>
                    </DashSelect>
                    <DashSelect label="type" value={data.isExpense} onChange={(e) => { setData({ ...data, isExpense: Number(e.target.value) }) }}>
                        <option value={-1}>Expense</option>
                        <option value={1}>Income</option>
                    </DashSelect>
                    <DashField label="Date" type="date" value={data.date.format('YYYY-MM-DD')} onChange={e => { setData({ ...data, date: dayjs(e.target.value) }) }} />
                </span>
                <span className="flex gap-2 flex-row">

                    <DashSelect disabled={bankAccount && true} label="Account" value={data.bankAccountId} onChange={e => {
                        setData({ ...data, bankAccountId: e.target.value })
                    }}>
                        {bankAccounts.map(account => (
                            <option key={account.id} value={account.id} >{account.name}</option>
                        ))}
                    </DashSelect>
                    <DashButton className="mt-6 border-emerald-600 text-emerald-800 hover:bg-green-50 hover:text-emerald-600" type="submit">Create</DashButton>
                    {error && <p className="mt-6 flex items-center font-medium text-sm text-neutral-800 gap-2 "><ErrorIcon className="text-red-800" />{error}</p>}
                </span>

            </form>

        </DashContainer>
    )
}