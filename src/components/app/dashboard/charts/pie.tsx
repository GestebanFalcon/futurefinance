"use client"

import { SelectTransaction } from "@/lib/drizzy/schema/other";
import { TransactionFilters } from "./chartSpace";
import { PieChart } from "@mui/x-charts";

export default function Pie({ filters, transactions }: { filters: TransactionFilters, transactions: SelectTransaction[] }) {
    const categories = [...new Set(transactions.map((transaction) => transaction.category))];
    const categoryData = categories.map((category) => (
        {
            label: category, value: (
                Math.abs(transactions.reduce((accumulator, currentValue) => ((accumulator + ((currentValue.category === category) ? currentValue.value : 0))), 0)) / 100
            )
        }
    ))
    return (
        <>
            <h2 className="font-semibold">Spending By Category ($)</h2>
            <PieChart className="h-64" series={[
                {
                    data: [...categoryData]
                }
            ]} />
        </>
    )
}