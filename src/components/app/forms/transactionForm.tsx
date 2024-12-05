"use client"

import DashField from "./dashField";
import DashContainer from "../dashboard/dashContainer";
import DashSelect from "./dashSelect";
import { InsertTransaction } from "@/lib/drizzy/schema/other";
import { useState } from "react";
import DashButton from "./dashButton";

export default function TransactionForm() {
    const [data, setData] = useState<Omit<InsertTransaction, InsertTransaction["bankAccountId"]>>({
        source: "",
        value: 0,
        category: "other",
        date: new Date(),

    });

    const handleSubmit = () => {

    }

    return (
        <DashContainer className="flex-grow">
            <h1 className="text-xl">Add Transaction</h1>
            <form className="flex flex-col gap-2">
                <span className="flex gap-2 flex-row">
                    <DashField label="Source" />
                    <DashField label="Value" />
                </span>
                <span className="flex gap-2 flex-row">
                    <DashSelect label="Category">
                        <option value="other">Other</option>
                        <option value="muzz">The Muzz</option>
                    </DashSelect>
                    <DashField label="Date" />
                </span>

            </form>
            <DashButton className="mt-1" onClick={handleSubmit}>Create</DashButton>
        </DashContainer>
    )
}