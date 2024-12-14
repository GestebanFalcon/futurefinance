import { SelectTransaction } from "@/lib/drizzy/schema/other";
import ChartPicker from "./chartPicker";
import { Dispatch, SetStateAction, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import ChartDisplay from "./chartDisplay";

export type Filter = (transaction: SelectTransaction) => boolean;
export type TransactionFilters = {
    timeFilter?: Filter;
    categoryFilter?: Filter;
    sourceFilter?: Filter;
    valueFilter?: Filter;
}


export type Filters = {
    startDate?: Dayjs;
    query?: string;
    category?: string;
    minValue?: string;
    maxValue?: string
}

export type chartType = "Pie" | "Table" | "Bar"

export default function ChartSpace({ transactions, setTransactions }: { transactions: SelectTransaction[], setTransactions: Dispatch<SetStateAction<SelectTransaction[]>> }) {

    const [chart, setChart] = useState<chartType>("Bar")
    const [filters, setFilters] = useState<Filters>({
        startDate: dayjs().subtract(1, "month"),
        query: "",
        category: "",
        minValue: "",
        maxValue: "",

    });
    const timeFilter = (transaction: SelectTransaction) => {
        if (!filters.startDate) { return true };
        return (filters.startDate?.toDate() < (transaction.date));
    }
    const categoryFilter = (transaction: SelectTransaction) => {
        if (!filters.category) { return true };
        return (filters.category === transaction.category);
    }
    const sourceFilter = (transaction: SelectTransaction) => {
        if (!filters.query) { return true };
        return (!!transaction.source?.startsWith(filters.query));
    }
    const valueFilter = (transaction: SelectTransaction): boolean => {
        if (!filters.maxValue && !filters.minValue) { return true };
        if (filters.maxValue && filters.minValue) { return (Number(filters.minValue) < transaction.value && transaction.value < Number(filters.maxValue)) };
        if (filters.maxValue) { return transaction.value < Number(filters.maxValue) };
        return transaction.value > Number(filters.minValue);
    }
    const transactionFilters: TransactionFilters = {
        timeFilter,
        categoryFilter,
        sourceFilter,
        valueFilter
    }



    return (
        <div className="flex-grow flex flex-col gap-8">
            <ChartPicker chart={chart} setChart={setChart} />
            <ChartDisplay setTransactions={setTransactions} chart={chart} transactions={transactions} filters={transactionFilters} />
        </div>
    )
}

