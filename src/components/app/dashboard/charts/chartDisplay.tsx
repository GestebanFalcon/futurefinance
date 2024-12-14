import { SelectTransaction } from "@/lib/drizzy/schema/other";
import { chartType, TransactionFilters } from "./chartSpace";
import { PieChart } from "@mui/x-charts/PieChart";
import { BarChart } from "@mui/x-charts";
import { DataGrid } from "@mui/x-data-grid"
import Pie from "./pie";
import Table from "./table";
import { Dispatch, SetStateAction } from "react";
import Bar from "./bar";

export default function ChartDisplay({ filters, transactions, chart, setTransactions }: { setTransactions: Dispatch<SetStateAction<SelectTransaction[]>>, filters: TransactionFilters, transactions: SelectTransaction[], chart: chartType }) {



    return (
        <section className=" flex flex-col overflow-y-hidden h-full bg-zinc-100 shadow-sm w-full  ">
            <div className=" flex overflow-y-hidden flex-col p-8">
                <div className="flex flex-row justify-center gap-4"><button className="c"></button></div>

                {
                    chart === "Pie" &&
                    <Pie filters={filters} transactions={transactions} />
                }

                {chart === "Bar" &&
                    <Bar transactions={transactions} />
                }

                {
                    chart === "Table" &&
                    <Table setTransactions={setTransactions} transactions={transactions} />
                }

            </div>
        </section>
    )
}