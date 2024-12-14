"use client"
import editBankAccount from "@/actions/editBankAccount";
import editUser from "@/actions/editUser";
import { useBankAccounts } from "@/components/app/context/bankAccountsProvider";
import { useUser } from "@/components/app/context/userProvider";
import DashContainer from "@/components/app/dashboard/dashContainer";
import DashButton from "@/components/app/forms/dashButton";
import DashField from "@/components/app/forms/dashField";
import { useSession } from "next-auth/react";
import { useState } from "react";

export default function Page() {

    const { user, setUser } = useUser();

    if (!user) return (<></>)

    const [isEditing, setIsEditing] = useState(false);
    const [error, setError] = useState<undefined | string>()
    const [editData, setEditData] = useState({ name: user.name, email: user.email });

    const cancelEdit = () => {
        setEditData({ name: user.name, email: user.email });
        setIsEditing(false);
    }

    const handleSubmit = async () => {
        try {

            const res = await editUser({ name: editData.name, email: editData.email });

            if (res.error) {
                setError(res.error)
                cancelEdit();
            }
            if (res.newUser) { await setUser({ ...user, email: res.newUser.email, name: res.newUser.name }) }
        } catch (err) {
            setError("Something went wrong");
            throw err
        }

        setIsEditing(false);
    }

    return (
        <div className="flex-grow flex p-32 flex-col items-center">
            <DashContainer>
                <h1 className="m-0 p-0 text-xl">Settings</h1>
                <div className="flex flex-row gap-2">
                    <DashField disabled={!isEditing} label="Name" value={editData.name ? editData.name : undefined} onChange={e => {
                        if (isEditing) {
                            setEditData({ ...editData, name: e.target.value })
                        }

                    }} />

                    <DashField disabled={true} label="Type" value={editData.email ? editData.email : undefined} onChange={e => {
                        if (isEditing) {
                            setEditData({ ...editData, email: e.target.value })
                        }
                    }} />

                </div>
                {
                    !isEditing && <DashButton className=" border-yellow-600 text-yellow-800 hover:bg-yellow-50 hover:text-yellow-400" onClick={e => { setIsEditing(true) }}>Edit</DashButton>
                }
                {
                    isEditing &&
                    <span className=" flex flex-row gap-2">
                        <DashButton className=" border-red-600 text-red-800 hover:bg-red-50 hover:text-red-400" onClick={cancelEdit}>Back</DashButton>
                        <DashButton className=" border-emerald-600 text-emerald-800 hover:bg-emerald-50 hover:text-emerald-400" onClick={handleSubmit}>Save</DashButton>
                    </span>
                }
            </DashContainer>
        </div>
    )
}

// "use client"
// import Button from "@/components/form/button";
// import { useBankAccounts } from "../context/bankAccountsProvider"
// import { useState } from "react";
// import TextField from "@/components/form/textField";
// import DashField from "../forms/dashField";
// import DashButton from "../forms/dashButton";
// import DashContainer from "./dashContainer";
// import editBankAccount from "@/actions/editBankAccount";

// export default function AccountBar() {

//     const { bankAccount, setBankAccount, bankAccounts } = useBankAccounts();
//     if (!bankAccount) { return };

//     const [isEditing, setIsEditing] = useState(false);
//     const [error, setError] = useState<undefined | string>()
//     const [editData, setEditData] = useState({ name: bankAccount.name, type: bankAccount.type });

//     const cancelEdit = () => {
//         setEditData(bankAccount);
//         setIsEditing(false);
//     }

//     const handleSubmit = async () => {
//         try {

//             const res = await editBankAccount({ name: editData.name, type: editData.type, id: bankAccount.id });

//             if (res.error) {
//                 setError(res.error)
//                 cancelEdit();
//             }
//             if (res.newBankAccount) { setBankAccount(res.newBankAccount) }
//         } catch (err) {
//             setError("Something went wrong");
//             throw err
//         }

//         setIsEditing(false);
//     }

//     return (
//         <DashContainer >
//             <h1 className="m-0 p-0 text-xl">Settings</h1>
//             <div className="flex flex-row gap-2">
//                 <DashField disabled={!isEditing} label="Name" value={editData.name} onChange={e => {
//                     if (isEditing) {
//                         setEditData({ ...editData, name: e.target.value })
//                     }

//                 }} />
//                 {
//                     editData.type
//                     &&
//                     <DashField disabled={!isEditing} label="Type" value={editData.type} onChange={e => {
//                         if (isEditing) {
//                             setEditData({ ...editData, type: e.target.value })
//                         }
//                     }} />
//                 }
//             </div>
//             {
//                 !isEditing && <DashButton className=" border-yellow-600 text-yellow-800 hover:bg-yellow-50 hover:text-yellow-400" onClick={e => { setIsEditing(true) }}>Edit</DashButton>
//             }
//             {
//                 isEditing &&
//                 <span className=" flex flex-row gap-2">
//                     <DashButton className=" border-red-600 text-red-800 hover:bg-red-50 hover:text-red-400" onClick={cancelEdit}>Back</DashButton>
//                     <DashButton className=" border-emerald-600 text-emerald-800 hover:bg-emerald-50 hover:text-emerald-400" onClick={handleSubmit}>Save</DashButton>
//                 </span>
//             }
//         </DashContainer >
//     )
// }