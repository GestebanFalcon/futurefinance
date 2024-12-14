"use client"

import { SelectTransaction } from "@/lib/drizzy/schema/other"
import { DataGrid, GridRowSelectionModel } from "@mui/x-data-grid"
import dayjs from "dayjs"
import { Dispatch, SetStateAction, useState } from "react"
import DashButton from "../../forms/dashButton"
import deleteTransactions from "@/actions/deleteTransactions"
import { useBankAccounts } from "../../context/bankAccountsProvider"

export default function Table({ transactions, setTransactions }: { transactions: SelectTransaction[], setTransactions: Dispatch<SetStateAction<SelectTransaction[]>> }) {

    const { bankAccount } = useBankAccounts();

    if (!bankAccount) return (<></>)

    const [rowSelectionModel, setRowSelectionModel] = useState<GridRowSelectionModel>([])

    const handleDelete = async () => {
        console.log(rowSelectionModel);
        const res = await deleteTransactions(transactions.filter(transaction => rowSelectionModel.includes(transaction.id)), bankAccount.id);

        if (res.error) {
            throw res.error;
        }
        if (res.transactions) {
            setTransactions(res.transactions);
        }
    }

    return (
        <>
            <DataGrid checkboxSelection
                onRowSelectionModelChange={(newRowSelectionModel) => {
                    setRowSelectionModel(newRowSelectionModel);
                }}
                rowSelectionModel={rowSelectionModel}
                columns={[{ field: "id" }, { field: "Category" }, { field: "Source" }, { field: "Value" }, { field: "Date" },]} rows={
                    transactions.map(transaction => {
                        const date = dayjs(transaction.date)
                        return ({
                            id: transaction.id,
                            Category: transaction.category,
                            Source: transaction.source,
                            Value: `$${transaction.value / 100}`,
                            Date: `${date.month()}/${date.date()}/${date.year()}`
                        })
                    }
                    )
                } />

            {
                <DashButton onClick={e => { handleDelete() }} disabled={rowSelectionModel.length > 0 ? false : true} className={`transition-all mt-2 ${rowSelectionModel.length > 0 ? "border-red-800 text-red-800 hover:border-red-800 hover:text-red-600 hover:bg-red-50 w-auto" : "text-neutral-400"}`}>Delete Rows</DashButton>
            }
        </>
    )
}