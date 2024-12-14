import { SelectTransaction } from "@/lib/drizzy/schema/other";
import { BarChart } from "@mui/x-charts";
import dayjs from "dayjs";

export default function Bar({ transactions }: { transactions: SelectTransaction[] }) {
    const year = dayjs(new Date()).year();

    const months = ['January', 'February', 'March', "April", "May", "June", "July", "August", "September", "October", "November", "December"]
    const monthData = months.map((month, index) => (transactions.reduce((accumulator, currentValue) => ((accumulator + ((dayjs(currentValue.date).month() === (index + 1)) ? currentValue.value : 0))), 0)) / 100)
    // transactions.reduce((accumulator, currentValue) => ((accumulator + ((dayjs(currentValue.date).mon === category) ? currentValue.value : 0))), 0)) / 100
    return (
        <>
            <h2 className="font-semibold">2024 Monthly Spending ($)</h2>
            <BarChart className="mb-0 h-96 "
                xAxis={[{ scaleType: 'band', data: months }]}
                series={[
                    {

                        data: monthData
                    }
                ]} />
        </>
    )
}