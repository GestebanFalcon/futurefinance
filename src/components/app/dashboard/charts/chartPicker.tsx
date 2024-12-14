"use client"

import dayjs from "dayjs";
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from "react";
import { chartType, Filter, Filters, TransactionFilters } from "./chartSpace";
import DashField from "../../forms/dashField";
import Button from "@/components/form/button";

export default function ChartPicker({ chart, setChart }: { chart: chartType, setChart: Dispatch<SetStateAction<chartType>> }) {


    return (
        <section className=" h-32 bg-zinc-100 shadow-sm w-full flex flex-row gap-4 justify-center items-center p-4">
            <Button onClick={e => setChart("Bar")} className={chart === "Bar" ? "bg-emerald-700 hover:bg-emerald-900" : ""}>Monthly Spending</Button>
            <Button onClick={e => setChart("Pie")} className={chart === "Pie" ? "bg-emerald-700 hover:bg-emerald-900" : ""}>Spending by Category</Button>
            <Button onClick={e => setChart("Table")} className={chart === "Table" ? "bg-emerald-700 hover:bg-emerald-900" : ""}>All Transactions</Button>
        </section>
    )
}