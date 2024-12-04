import Sidebar from "@/components/app/sidebar/sidebar";
import SessionProvider from "@/components/app/context/sessionProvider";
import { auth } from "@/lib/drizzy/auth";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import getBankAccountsByUserId from "@/lib/drizzy/queries/bankAccounts/getBankAccountsByUserId";
import UserProvider from "@/components/app/context/userProvider";
import BankAccountsProvider from "@/components/app/context/bankAccountsProvider";

export default async function Layout({ children }: { children: ReactNode }) {

    //Fetch all initial data to be used in contexts on the server
    const session = await auth();
    const user = session?.user;

    //Redirect to login if the user is not logged in
    if (!user) { redirect("/login") }

    const bankAccounts = await getBankAccountsByUserId(user.id);



    return (
        <div className="flex-grow flex flex-row w-full">
            <UserProvider initialUser={user}>
                <BankAccountsProvider initialBankAccounts={bankAccounts}>
                    <Sidebar />
                    {children}
                </BankAccountsProvider>
            </UserProvider>
        </div>
    )
}