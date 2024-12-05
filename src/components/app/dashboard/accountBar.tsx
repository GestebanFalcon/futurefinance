"use client"
import Button from "@/components/form/button";
import { useBankAccounts } from "../context/bankAccountsProvider"
import { useCallback, useState } from "react";
import TextField from "@/components/form/textField";
import DashField from "../forms/dashField";
import DashButton from "../forms/dashButton";
import DashContainer from "./dashContainer";

export default function AccountBar() {

    const { bankAccount, setBankAccount } = useBankAccounts();

    if (!bankAccount) { return };

    const [isEditing, setIsEditing] = useState(false);
    const [editData, setEditData] = useState({ name: bankAccount.name, type: bankAccount.type });
    const handleSubmit = useCallback(() => {

    }, [bankAccount])

    return (
        <DashContainer >
            <h1 className="m-0 p-0 text-xl">Settings</h1>
            <div className="flex flex-row gap-2">
                <DashField label="Name" value={editData.name} onChange={e => {
                    if (isEditing) {
                        setEditData({ ...editData, name: e.target.value })
                    }

                }} />
                {
                    editData.type
                    &&
                    <DashField label="Type" value={editData.type} onChange={e => {
                        if (isEditing) {
                            setEditData({ ...editData, type: e.target.value })
                        }
                    }} />
                }
            </div>
            <DashButton onClick={e => { setIsEditing(true) }}>Edit</DashButton>
        </DashContainer >
    )
}