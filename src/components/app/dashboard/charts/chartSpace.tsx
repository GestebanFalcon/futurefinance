import { SelectTransaction } from "@/lib/drizzy/schema/other";
import FilterBar from "./filterBar";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";

export type Filter = (transaction: SelectTransaction) => boolean;
export type TransactionFilters = {
    timeFilter?: Filter;
    categoryFilter?: Filter;
    nameFilter?: Filter;
    valueFitler?: Filter;
}


export type Filters = {
    startDate?: Dayjs;
    query?: string;
    category?: string;
    minValue?: number;
    maxValue?: number
}

export default function ChartSpace() {


    const [filters, setFilters] = useState<Filters>({
        startDate: dayjs().subtract(1, "month"),
        query: "",
        category: "",
        minValue: 0,
        maxValue: undefined,

    })



    return (
        <div className="flex-grow flex flex-col gap-8">
            <FilterBar filters={filters} setFilters={setFilters} />
            <section className=" flex-grow bg-zinc-100 shadow-sm w-full"></section>
        </div>
    )
}

